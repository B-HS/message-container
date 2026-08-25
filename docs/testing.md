# 테스트 구성

> 최종 갱신: 2026-08-25 · 기준: dev 브랜치

`bun:test` 러너 기준. 계층 구조·에러 체계 등 코드가 전제하는 설계는 [docs/architecture.md](./architecture.md) 참고.

## 1. 실행 명령

| 명령                     | 범위                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `bun test`               | 전체 — 루트에서는 워크스페이스별 실행(`bun run test`), 현재 server 139 · web 6 pass |
| `bun test tests/lib`     | lib 단위 테스트만                                                                   |
| `bun test tests/dto`     | dto 단위 테스트만                                                                   |
| `bun test tests/service` | service 단위 테스트만                                                               |
| `bun test tests/compose` | sqlite provider 통합 테스트만                                                       |
| `bun test tests/e2e`     | e2e 전체(전체 배선 + 서버 부트)                                                     |
| `bun test <파일 경로>`   | 단일 파일                                                                           |

`bun run typecheck`(`tsc --noEmit`)와 `bun run format:check`(`prettier --check .`)를 테스트 전후로 함께 돌리는 것을 기본 검증 사다리로 한다.

## 2. 분류

### 단위 — `tests/lib/`, `tests/dto/`

HTTP·DB 없이 순수 함수·Zod 스키마만 검증한다.

| 파일                          | 대상                                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `api-response.test.ts`        | `successResponse`·`paginatedResponse`(totalPages 계산)·`errorResponses`·`errorResponse`(프로덕션에서 details 숨김) |
| `apple-time.test.ts`          | `appleEpochMsToUtcMs`                                                                                              |
| `collection.test.ts`          | `chunk`                                                                                                            |
| `env.test.ts`                 | `envSchema` — 기본값, `DB_PROVIDER≠sqlite` 일 때 `DATABASE_URL` 필수 검증                                          |
| `error.test.ts`               | `createAppError`·`getStatusCode`·`isAppError`                                                                      |
| `typedstream.test.ts`         | `extractTypedstreamText` — 정상 추출·마커 없음·길이 초과 등                                                        |
| `validation-hook.test.ts`     | `validationHook` — 실패 시 `VALIDATION_ERROR` 400 봉투                                                             |
| `with-error-handling.test.ts` | `withErrorHandling` — `AppError`/일반 예외 각각의 응답 변환                                                        |
| `bearer-token.test.ts`        | `getBearerToken` — Bearer 헤더 파싱                                                                                |
| `dto/common.test.ts`          | `paginationQuerySchema`·`idParamSchema`                                                                            |
| `dto/message.test.ts`         | `messageListQuerySchema`(`q` 옵션)                                                                                 |
| `dto/panel.test.ts`           | `panelSetupSchema`(최소 길이·confirm 일치)·`panelLoginSchema`·`apiKeyCreateSchema`                                 |

`with-error-handling.test.ts` 는 처리되지 않은 예외 경로(500 응답)를 검증하려고 의도적으로 `JSON.parse('{invalid')` 를 발생시킨다. 이때 콘솔에 찍히는 `[unhandled] SyntaxError` 로그는 그 테스트가 의도한 것이며 실패가 아니다(`lib/with-error-handling.ts` 의 `console.error('[unhandled]', error)`).

### 통합 — `tests/service/`, `tests/compose/`

Service 는 `*ServiceDb` 를 인라인 객체로 대체(mocking 라이브러리 없이)하거나, `chat-db-reader`/`sqlite-provider` 는 실제 `bun:sqlite` 인메모리 DB 로 검증한다.

| 파일                              | 대상                                                                                                                                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auth-service.test.ts`            | `authService` — 패스워드 설정 1회 제한·검증(잠금 포함), 인메모리 세션, API 키 생성(`msg_`·해시 저장)·검증·폐기                                                                                                                             |
| `chat-service.test.ts`            | `chatService` — `ChatServiceDb` 인라인 스텁                                                                                                                                                                                                |
| `message-service.test.ts`         | `messageService` — 목록/검색 페이지네이션                                                                                                                                                                                                  |
| `attachment-service.test.ts`      | `attachmentService` — 경로 traversal 방지(`ATTACHMENT_PATH_INVALID`) 포함                                                                                                                                                                  |
| `sync-service.test.ts`            | `syncService.runOnce` — 커서 전진, 배치 반복, 에러 기록                                                                                                                                                                                    |
| `chat-db-reader.test.ts`          | `chatDbReader.readBatch` — fake chat.db(`tests/helpers/fake-chat-db.ts`)에 실제 SQLite 스키마를 만들어 나노초/초 단위 date 변환, `handle_id=0` → null, group style(43) 매핑, 커서·limit, DB 파일 없을 때 `SYNC_SOURCE_UNAVAILABLE` 을 검증 |
| `compose/sqlite-provider.test.ts` | `createSqliteServiceDb` — 실제 마이그레이션(`drizzle/sqlite`)을 인메모리 DB 에 적용한 뒤 `saveBatch` 멱등성(upsert)·조회·검색·상태 갱신을 검증                                                                                             |

### e2e — `tests/e2e/`

| 파일                      | 대상                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api.e2e.test.ts`         | fake chat.db 를 파일로 시딩하고, `compose()` + `createRouter()` 로 조립한 실제 `Hono` 앱을 `app.request()` 로 호출한다. sync 실행 → 상태 조회 → 대화 목록/메시지/검색/첨부 조회 → 404·validation 에러까지 API 전체 배선을 검증한다                                                                                                                        |
| `server-boot.e2e.test.ts` | `Bun.spawn(['bun', 'index.ts'])` 로 실제 서버 프로세스를 별도 포트(3891)에 띄우고, `fetch` 로 패널 패스워드 설정 → 세션 쿠키로 API 키 발급 → 키 없이 401 → 키로 `/api/sync/status`·`/api/chats` → `/openapi.json` 까지 확인한다. `index.ts` 의 부트스트랩 순서(마이그레이션 → compose → 라우터 → sync 워커) 전체가 실제로 동작하는지 보는 유일한 테스트다 |
| `panel.e2e.test.ts`       | `/panel` 전체 흐름 — 초기 패스워드 설정(짧은 패스워드 거부·재설정 차단), 로그인 실패/성공, 세션 쿠키로 키 발급(`data-new-key` 1회 표시), 발급 키로 API 호출, 폐기 후 401                                                                                                                                                                                  |
| `mcp.e2e.test.ts`         | `/mcp` — 키 없이 401, `initialize`·`tools/list`(6종)·`tools/call`(검색·대화 메시지·첨부 이미지 base64·run_sync) 를 SSE 응답 파싱으로 검증                                                                                                                                                                                                                 |

## 3. `tests/helpers/`

| 파일                     | 역할                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `test-env.ts`            | side-effect 모듈 — import 만으로 `process.env.DB_PROVIDER='sqlite'`, `SQLITE_PATH=':memory:'`, `NODE_ENV='test'` 를 설정한다. `getEnv()` 는 최초 호출 시 결과를 캐시하므로, `getEnv()` 를 간접 호출하는 코드(`lib/api-response.ts` 의 `errorResponse` details 분기 등)를 테스트하는 파일은 **다른 import 보다 먼저** `import '@/tests/helpers/test-env'` 를 최상단에 둬야 한다 |
| `fake-chat-db.ts`        | `createFakeChatDbSchema(db)` — 실 `chat.db` 와 같은 이름의 테이블(`message`·`chat`·`chat_message_join`·`chat_handle_join`·`handle`·`attachment`·`message_attachment_join`)을 `bun:sqlite` 인메모리/임시 파일 DB 에 만든다. `chat-db-reader`·`api.e2e`·`server-boot.e2e` 테스트가 공용으로 쓴다                                                                                 |
| `typedstream-fixture.ts` | `buildTypedstreamBody(text)` — `NSString` 마커 + 길이 프리픽스를 가진 최소한의 typedstream 바이너리를 만들어 `extractTypedstreamText` 파싱 대상으로 쓴다                                                                                                                                                                                                                       |
| `parse-json.ts`          | `parseJson(res, schema)` — 응답 JSON 을 Zod 스키마로 파싱해 e2e 테스트의 응답 타입을 함께 검증한다                                                                                                                                                                                                                                                                             |

## 4. 커버되지 않는 것

- `mysql`·`postgres` provider 의 실 DB 연동은 자동 테스트 대상이 아니다 — [docs/quality-assurance/provider-verification.md](./quality-assurance/provider-verification.md) 참고.
- 실 `chat.db`(Full Disk Access 필요) 를 사용한 검증, `attributedBody` 추출률 검증도 수동 확인 대상이다.
