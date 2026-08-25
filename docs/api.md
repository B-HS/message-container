# API 스펙

macOS Messages(`chat.db`) 조회 API 의 엔드포인트·인증·응답 봉투·에러 코드 스펙. 계층 구조·설계 근거는 [docs/architecture.md](./architecture.md), 실행 절차는 [docs/setup.md](./setup.md) 참고.

Base URL: `http://localhost:3000` (기본 `PORT`, `lib/env.ts`)

## 1. 인증

이 서버는 개인용 단일 사용자 전제로 별도 계정 시스템 없이 **앱 패스워드 + API 키** 방식을 쓴다(합의: [docs/acknowledge/2026-08-25-auth-mcp.md](./acknowledge/2026-08-25-auth-mcp.md)).

1. 브라우저로 `/panel` 접속 — 패스워드가 없으면 초기 설정 폼, 있으면 로그인 폼이 뜬다.
2. 초기 설정: 패스워드(최소 8자) + 확인 값을 제출한다(`dto/panel.ts` 의 `panelSetupSchema`, `password.min(8)` + `confirm` 일치 `refine`).
3. 로그인 후 키 관리 화면에서 이름(1~100자, `apiKeyCreateSchema`)을 입력해 키를 생성한다. `msg_` prefix 키 **원문은 생성 응답에 한 번만** `<code data-new-key>` 로 표시되며, DB 에는 SHA-256 해시만 저장되어 재조회할 수 없다.
4. 발급받은 키를 모든 `/api/*` 요청과 `/mcp` 요청에 아래 헤더로 전달한다.

```
Authorization: Bearer msg_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- `/api/*` 전체는 `middleware/require-api-key.ts` 가 `api.use('*', ...)` 로 게이트한다(`route/index.ts`). 키가 없거나, prefix 가 `msg_` 가 아니거나, 폐기된 키면 아래 401 봉투를 반환하고 라우트 핸들러까지 가지 않는다.

```json
{ "success": false, "error": { "code": "UNAUTHORIZED", "message": "유효한 API 키가 필요합니다" } }
```

- `/panel`(세션 쿠키로 별도 보호)과 `/openapi.json` 은 API 키 없이 접근 가능하다.
- 키는 패널의 "폐기" 버튼으로 즉시 무효화할 수 있다. 폐기된 키로의 이후 호출은 모두 401 이다.

## 2. 엔드포인트 목록

| 메서드 | 경로                        | 인증      | 설명                                                              |
| ------ | --------------------------- | --------- | ----------------------------------------------------------------- |
| GET    | `/api/auth/status`          | 공개      | 초기 설정(패스워드) 여부 조회 — `{ passwordSet }`                 |
| POST   | `/api/auth/setup`           | 공개      | 최초 1회 패스워드 설정 + API 키 발급 (재호출 409)                 |
| POST   | `/api/auth/login`           | 공개      | 패스워드 검증 + API 키 발급 (틀리면 401, 연속 실패 잠금 시 429)   |
| GET    | `/api/chats`                | API 키    | 대화 목록 (참여자 포함, 페이지네이션)                             |
| GET    | `/api/chats/:id`            | API 키    | 대화 단건 조회                                                    |
| GET    | `/api/chats/:id/messages`   | API 키    | 대화별 메시지 목록 (최신순)                                       |
| GET    | `/api/messages`             | API 키    | 메시지 검색 (`q` 생략 시 최근 메시지)                             |
| GET    | `/api/attachments`          | API 키    | 메시지별 첨부 메타데이터 일괄 조회 (`messageIds=1,2,3`, 최대 200) |
| GET    | `/api/attachments/:id/file` | API 키    | 첨부파일 원본 바이너리                                            |
| GET    | `/api/sync/status`          | API 키    | 동기화 상태 (커서·시각·건수·에러)                                 |
| POST   | `/api/sync/run`             | API 키    | 동기화 즉시 실행                                                  |
| GET    | `/openapi.json`             | 공개      | OpenAPI 3 스펙 (프로덕션 포함 항상 제공)                          |
| GET    | `/panel`                    | 세션 쿠키 | API 키 관리 화면 (초기 설정·로그인은 웹 대시보드에서도 가능)      |

인증 API 의 `setup`/`login` 요청 바디는 `{ "password": string, "keyName"?: string }`(JSON) 이며, 성공 시 `{ id, name, start, key }` 를 반환한다 — `key` 원문은 이 응답에서 1회만 노출된다. 웹 대시보드(`apps/web`)는 이 API 로 초기 설정·로그인을 수행하고 발급 키를 httpOnly 쿠키로 보관한다.

## 3. 공통 응답 봉투

`lib/api-response.ts` 의 헬퍼로만 만들어진다.

```typescript
successResponse(data) // { success: true, data }
paginatedResponse(data, pagination) // { success: true, data, pagination: { page, limit, total, totalPages } }
errorResponse(code, message, details) // { success: false, error: { code, message, details? } }
```

- `paginatedResponse` 의 `totalPages` 는 `Math.ceil(total / limit)` 으로 서버가 계산해 채운다.
- `error.details` 는 `NODE_ENV !== 'production'` 일 때만 포함된다(운영 환경에서 정보 노출 방지).

## 4. 엔드포인트 상세

### GET /api/chats

쿼리: `page`(정수, 1 이상, 기본 1), `limit`(정수, 1~100, 기본 20) — 모두 `z.coerce.number()` 이므로 문자열로 와도 강제 변환된다(`dto/common.ts` 의 `paginationQuerySchema`).

응답 `data` 의 각 항목(`ChatSummary`, `service/domain/message/chat-service.ts`):

```typescript
type ChatSummary = {
    sourceRowId: number
    guid: string
    identifier: string | null
    serviceName: string | null
    displayName: string | null
    isGroup: boolean
    participants: { address: string; service: string | null }[]
}
```

에러: `401 UNAUTHORIZED`, `400 VALIDATION_ERROR`(`limit`이 100 초과 등).

### GET /api/chats/:id/messages

경로 파라미터: `id`(정수, 양수 — `dto/common.ts` 의 `idParamSchema`). 쿼리는 `/api/chats` 와 동일한 `page`/`limit`.

대화가 없으면 `404 CHAT_NOT_FOUND`. 응답 `data` 의 각 항목(`MessageSummary`)은 아래 "메시지 응답 형태" 참고. 최신 메시지가 먼저 온다.

### GET /api/messages

쿼리: `page`·`limit`(위와 동일) + `q`(문자열, 최소 1자, 선택 — `dto/message.ts` 의 `messageListQuerySchema`). `q` 를 생략하면 전체 대화의 최근 메시지를 반환한다.

응답 `data` 의 각 항목은 `/api/chats/:id/messages` 와 같은 `MessageSummary`.

### 메시지 응답 형태 (`MessageSummary`)

`GET /api/chats/:id/messages`, `GET /api/messages` 공통(`service/domain/message/message-service.ts`):

```typescript
type MessageSummary = {
    sourceRowId: number
    guid: string
    chatSourceRowId: number | null
    senderAddress: string | null // 본인이 보낸 메시지면 null
    isFromMe: boolean
    text: string | null // 추출 실패 가능성 있음 — docs/architecture.md §9 참고
    service: string | null
    sentAt: string // ISO 8601 (UTC)
    hasAttachments: boolean
}
```

### GET /api/attachments/:id/file

경로 파라미터: `id`(정수, 양수). 응답은 JSON 이 아니라 첨부파일 바이너리이며, `Content-Type` 은 원본 MIME(없으면 `application/octet-stream`), `Content-Disposition: inline; filename*=UTF-8''<원본파일명>` 이 붙는다.

에러: `404 ATTACHMENT_NOT_FOUND`(레코드 없음), `404 ATTACHMENT_FILE_NOT_FOUND`(레코드는 있으나 마운트된 볼륨에 파일 없음), `422 ATTACHMENT_PATH_INVALID`(경로가 attachments 루트를 벗어나는 traversal 시도로 판단됨).

### GET /api/sync/status

쿼리·파라미터 없음. 응답 `data`(`service/domain/message/sync-service.ts`):

```typescript
type SyncStatus = {
    cursor: number
    lastSyncAt: string | null // ISO 8601
    lastError: string | null
    counts: { chats: number; messages: number; attachments: number }
}
```

### POST /api/sync/run

바디 없음. 즉시 1회 동기화를 실행하고 완료까지 응답을 블로킹한다. 응답 `data`: `{ synced: number }`(이번 실행에서 새로 적재된 메시지 수).

에러: `503 SYNC_SOURCE_UNAVAILABLE`(live `chat.db` 를 읽을 수 없을 때 — VirtioFS 로 WAL 을 읽지 못하는 경우 등, [docs/architecture.md §8](./architecture.md) 참고).

## 5. 에러 코드

`lib/error-code.ts`(`ERROR_CODE`) · `lib/error.ts`(`STATUS_MAP`) · `lib/error-message.ts`(`ERROR_MESSAGE`) 기준.

| 코드                        | HTTP 상태 | 메시지                            |
| --------------------------- | :-------: | --------------------------------- |
| `UNAUTHORIZED`              |    401    | 유효한 API 키가 필요합니다        |
| `VALIDATION_ERROR`          |    400    | 요청 값이 올바르지 않습니다       |
| `CHAT_NOT_FOUND`            |    404    | 대화를 찾을 수 없습니다           |
| `ATTACHMENT_NOT_FOUND`      |    404    | 첨부파일을 찾을 수 없습니다       |
| `ATTACHMENT_FILE_NOT_FOUND` |    404    | 첨부파일 원본이 존재하지 않습니다 |
| `ATTACHMENT_PATH_INVALID`   |    422    | 첨부파일 경로가 유효하지 않습니다 |
| `SYNC_SOURCE_UNAVAILABLE`   |    503    | chat.db 를 읽을 수 없습니다       |
| `INTERNAL_ERROR`            |    500    | 서버 내부 오류가 발생했습니다     |

`VALIDATION_ERROR` 는 요청 검증 단계(`lib/validation-hook.ts`)에서 발생하며 `error.details.issues` 에 Zod 이슈 목록이 포함된다(비프로덕션만). 그 외 코드는 각 Route 가 `throw createAppError(code)` 로 던진 것을 `withErrorHandling` 이 해당 `statusCode` 로 변환한다. 처리되지 않은 예외는 전부 `INTERNAL_ERROR`(500)로 변환된다.

## 6. curl 예시

```bash
# 1. 초기 패스워드 설정 (최초 1회) — 쿠키를 파일로 저장해 세션 유지
curl -c cookies.txt -X POST http://localhost:3000/panel/setup \
  -d "password=my-strong-password&confirm=my-strong-password"

# 2. 키 발급 (세션 쿠키 필요) — 응답 HTML의 <code data-new-key>msg_...</code> 안의 값을 복사해 둔다(재표시되지 않는다)
curl -b cookies.txt -X POST http://localhost:3000/panel/keys -d "name=my-cli"

# 3. 발급받은 키로 대화 목록 조회
curl -H "Authorization: Bearer msg_xxxxxxxxxxxxxxxx" http://localhost:3000/api/chats

# 4. 메시지 검색
curl -H "Authorization: Bearer msg_xxxxxxxxxxxxxxxx" \
  "http://localhost:3000/api/messages?q=%EC%82%AC%EC%A7%84&limit=10"

# 5. 첨부파일 다운로드
curl -H "Authorization: Bearer msg_xxxxxxxxxxxxxxxx" \
  http://localhost:3000/api/attachments/100/file -o photo.png

# 6. 동기화 즉시 실행
curl -X POST -H "Authorization: Bearer msg_xxxxxxxxxxxxxxxx" http://localhost:3000/api/sync/run
```

이미 패스워드가 설정되어 있다면 1번 대신 `/panel/login` 에 `password` 만 담아 POST 한다.

## 7. OpenAPI

`GET /openapi.json` 은 프로덕션을 포함해 항상 제공된다(`index.ts`). `bearerAuth`(`type: http, scheme: bearer`) security scheme 이 전역으로 선언되어 있어, Swagger UI 등 OpenAPI 클라이언트에서 발급받은 `msg_` 키를 Bearer 토큰으로 입력하면 스펙에 정의된 모든 엔드포인트를 시험 호출할 수 있다.
