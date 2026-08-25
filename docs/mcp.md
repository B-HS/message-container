# MCP 가이드

> 최종 갱신: 2026-08-25 · 기준: dev 브랜치

AI 클라이언트(Claude Code 등)가 `/mcp` 로 접속해 macOS Messages 데이터를 조회하기 위한 연동 가이드. REST API 스펙은 [docs/api.md](./api.md), 서버 내부 구조는 [docs/architecture.md](./architecture.md) 참고.

## 1. 개요

- 엔드포인트: **`http://localhost:32000/mcp`** — 웹이 백엔드로 스트리밍 프록시한다(`apps/web/app/mcp/route.ts`, 백엔드는 기본 비노출). 전송 방식은 **Streamable HTTP**(`@hono/mcp` 의 `StreamableHTTPTransport`).
- 이전에 `:33000/mcp` 로 등록했다면 `:32000/mcp` 로 재등록해야 한다(백엔드 포트가 기본 비노출로 바뀜).
- 인증: REST API 와 동일한 `msg_` prefix API 키를 `Authorization: Bearer` 헤더로 전달한다(`/panel` 에서 발급 — [docs/setup.md §4](./setup.md), [docs/api.md §1](./api.md)). 키가 없거나 유효하지 않으면 MCP 프로토콜이 아니라 이 서버의 표준 에러 봉투로 `401 { success: false, error: { code: "UNAUTHORIZED", ... } }` 를 반환한다.
- 상태: 요청마다 새 `McpServer` + `StreamableHTTPTransport` 를 만들어 연결한다(`route/mcp.ts`) — 서버 프로세스에 별도 MCP 세션을 유지하지 않는 stateless 처리다.
- 도구는 REST API 와 같은 Service 계층(`ChatService`·`MessageService`·`AttachmentService`·`SyncService`)을 호출하므로, 조회 결과는 REST API 응답과 동일하다.

## 2. 연결 설정

### Claude Code CLI

```bash
claude mcp add --transport http message-container http://localhost:32000/mcp \
  --header "Authorization: Bearer msg_xxxxxxxxxxxxxxxx"
```

### `.mcp.json` (프로젝트/유저 설정 파일)

```json
{
    "mcpServers": {
        "message-container": {
            "type": "http",
            "url": "http://localhost:32000/mcp",
            "headers": {
                "Authorization": "Bearer msg_xxxxxxxxxxxxxxxx"
            }
        }
    }
}
```

### 그 외 Streamable HTTP 를 지원하는 MCP 클라이언트

커스텀 헤더가 있는 HTTP MCP 서버를 등록하는 클라이언트라면 대체로 아래 형태를 그대로 쓸 수 있다. 필드 이름은 클라이언트마다 다를 수 있으니(`headers` vs `header`, `type: "http"` vs `"streamable-http"` 등) 해당 클라이언트 문서를 확인한다.

```json
{
    "url": "http://localhost:32000/mcp",
    "transport": "http",
    "headers": {
        "Authorization": "Bearer msg_xxxxxxxxxxxxxxxx"
    }
}
```

배포 환경(원격 서버)에서 연결한다면 `localhost` 대신 실제 호스트/포트로 바꾼다. API 키는 컨테이너를 재기동해도 그대로 유효하다(자체 DB 에 해시로 저장되므로) — 재발급이 필요한 것은 서버 재시작이 아니라 키를 폐기했을 때뿐이다.

## 3. 도구 6종

`route/mcp.ts` 의 `buildMcpServer()` 에 등록된 실제 정의 기준.

| 도구                | 설명                                                                              | 입력 파라미터                                            | 반환                                                                                                                                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `list_chats`        | 동기화된 대화 목록을 최신순으로 나열(참여자 포함). 페이지네이션                   | `page?`(정수 ≥1, 기본 1), `limit?`(정수 1~100, 기본 20)  | `text` 콘텐츠 1개, JSON.stringify 된 `{ data: ChatSummary[], page, limit, total }`                                                                                                                                                                     |
| `get_chat_messages` | 한 대화의 메시지를 최신순으로 조회. `chatId` 는 `list_chats` 의 `sourceRowId`     | `chatId`(정수, 양수, 필수), `page?`, `limit?`(위와 동일) | `text` 콘텐츠, `{ chat: ChatSummary, messages: { data: MessageSummary[], page, limit, total } }`. 대화가 없으면 `isError: true` + 에러 문구                                                                                                            |
| `search_messages`   | 전 대화에서 키워드로 메시지 검색(`q` 생략 시 최근 메시지). 최신순, 페이지네이션   | `q?`(문자열, 최소 1자), `page?`, `limit?`(위와 동일)     | `text` 콘텐츠, `{ data: MessageSummary[], page, limit, total }`                                                                                                                                                                                        |
| `get_sync_status`   | 동기화 상태(커서·마지막 동기화 시각·마지막 에러·건수) 조회                        | 없음(`{}`)                                               | `text` 콘텐츠, `{ cursor, lastSyncAt, lastError, counts: { chats, messages, attachments } }`                                                                                                                                                           |
| `run_sync`          | live `chat.db` 에서 즉시 증분 동기화를 실행하고 완료까지 대기                     | 없음(`{}`)                                               | `text` 콘텐츠, `{ synced: number }`. 원본을 읽지 못하면 `isError: true` + `SYNC_SOURCE_UNAVAILABLE` 에러 문구                                                                                                                                          |
| `get_attachment`    | 첨부파일을 id 로 조회(메시지의 `hasAttachments`·첨부 메타데이터에서 얻은 id 사용) | `attachmentId`(정수, 양수, 필수)                         | 이미지(MIME `image/*`)면 `image` 콘텐츠(`{ type: "image", data: base64, mimeType }`), 그 외는 `resource` 콘텐츠(`{ type: "resource", resource: { uri: "attachment://{id}/{파일명}", blob: base64, mimeType } }`). 레코드/파일이 없으면 `isError: true` |

`ChatSummary`·`MessageSummary` 필드는 [docs/api.md §4](./api.md) 참고 — REST 응답과 동일한 타입이다.

## 4. 사용 흐름 예시

전형적인 조회 흐름(도구 이름 기준):

1. `run_sync` — 최신 메시지를 자체 DB 에 반영(선택 사항, `get_sync_status.lastSyncAt` 이 오래됐을 때만 필요).
2. `list_chats` — 대화 목록을 훑어 관심 있는 `chatId`(`sourceRowId`)를 찾는다.
3. `get_chat_messages({ chatId })` — 해당 대화의 최근 메시지를 가져온다. `hasAttachments: true` 인 메시지가 있으면 첨부 id 를 확인한다.
4. `get_attachment({ attachmentId })` — 필요한 첨부파일(사진 등)을 실제로 가져온다.

키워드로 바로 찾고 싶으면 2~3 단계 대신 `search_messages({ q })` 하나로 대체할 수 있다.

## 5. 한계

- **조회 전용이다.** 메시지 발송 도구는 없다 — 이 컨테이너는 Linux 환경이라 AppleScript 로 Messages 앱을 제어할 수 없다([docs/setup.md](./setup.md) 전제).
- `get_attachment` 은 이미지 원본을 base64 로 그대로 반환한다. 크기 제한이나 리사이즈를 하지 않으므로(개인용 전제, [docs/acknowledge/2026-08-25-auth-mcp.md](./acknowledge/2026-08-25-auth-mcp.md)), 큰 이미지나 반복 호출은 컨텍스트/토큰을 크게 소모할 수 있다 — 먼저 `search_messages`/`get_chat_messages` 로 필요한 첨부만 추려서 호출한다.
- `text: null` 인 메시지는 본문이 없는 것이 아니라 `attributedBody` 추출 실패일 수 있다([docs/architecture.md §9](./architecture.md)).
- 이 서버는 요청마다 새 MCP 세션을 만드는 stateless 구현이라, 클라이언트 쪽에서 별도의 장기 세션 상태(`initialize` 결과 캐시 등)에 의존하는 동작은 기대할 수 없다.
