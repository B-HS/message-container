# 실행 가이드

macOS Messages(chat.db)를 읽어 조회 API 를 제공하는 컨테이너의 실행 절차.

## 전제

- macOS + Docker Desktop(또는 OrbStack)
- 이 컨테이너는 **조회 전용**이다. 발송은 Linux 컨테이너에서 AppleScript 를 실행할 수 없어 범위 밖이다.

## 1. Full Disk Access 부여 (필수, 최초 1회)

`~/Library/Messages` 는 macOS TCC 보호 경로라, Docker 의 파일 공유 데몬에 Full Disk Access 가 없으면 마운트가 빈 디렉토리로 보이거나 실패한다.

1. 시스템 설정 → 개인정보 보호 및 보안 → 전체 디스크 접근 권한
2. Docker(또는 OrbStack) 를 목록에 추가하고 활성화
3. Docker Desktop/OrbStack 재시작

## 2. 실행

### 기본 (MySQL provider)

```bash
docker compose up -d --build
```

- API: `http://localhost:3000`
- MySQL: `localhost:3306` (기본 계정 `messages` / `messages`, `MYSQL_PASSWORD` 등 환경변수로 덮어쓰기 가능) — 외부 클라이언트가 동기화 DB 에 직접 접속할 수 있다

### SQLite provider (단일 컨테이너)

```bash
docker compose -f docker-compose.sqlite.yml up -d --build
```

- 동기화 DB 파일이 `./data/messages.db` 로 노출되어 호스트 도구로 직접 열 수 있다

### PostgreSQL provider

자체 Postgres 를 쓰는 경우 아래 환경변수로 실행한다.

```
DB_PROVIDER=postgres
DATABASE_URL=postgres://user:pass@host:5432/messages
```

## 3. 로컬 개발 (컨테이너 밖)

```bash
cp env.example .env
bun install
bun run dev
```

로컬에서는 `CHAT_DB_PATH=$HOME/Library/Messages/chat.db`, `ATTACHMENTS_ROOT=$HOME/Library/Messages/Attachments` 로 바꾸고, 터미널 앱에 Full Disk Access 를 부여해야 한다. `DB_PROVIDER=sqlite`, `SQLITE_PATH=./data/messages.db` 가 가장 간단하다.

## 4. 초기 패스워드 설정 · API 키 발급

서버가 처음 뜨면 발급된 API 키가 없어 `/api/*` 호출이 모두 401 이다. 브라우저(또는 curl)로 웹 패널에서 패스워드를 설정하고 키를 발급한다. 상세 curl 예시는 [docs/api.md §6](./api.md) 참고.

1. `http://localhost:3000/panel` 접속 — 패스워드가 설정되어 있지 않으면 "초기 패스워드 설정" 폼이 뜬다. 최소 8자 패스워드를 입력하고 확인란과 일치시켜 제출한다.
2. 이후 접속부터는 로그인 폼이 뜬다. 같은 패스워드로 로그인한다 — 세션은 인메모리라 **서버 재시작 시 다시 로그인**해야 하고, 5회 연속 로그인 실패 시 30초 잠긴다.
3. 로그인하면 API 키 관리 화면이 뜬다. 이름을 입력하고 "키 생성" 을 누르면 `msg_` 로 시작하는 키가 **한 번만** 화면(`<code data-new-key>`)에 표시된다 — 지금 복사해 둔다. DB 에는 SHA-256 해시만 저장되어 다시 조회할 수 없다.
4. 발급받은 키를 모든 `/api/*` 요청과 `/mcp` 요청에 `Authorization: Bearer msg_...` 헤더로 전달한다.
5. 더 이상 쓰지 않는 키는 같은 화면에서 "폐기" 로 즉시 무효화할 수 있다. 폐기된 키는 이후 모든 요청에서 401 이 된다.

## 5. API

모든 `/api/*` 요청은 §4 에서 발급받은 `Authorization: Bearer msg_...` 헤더가 필요하다. 쿼리 제약·응답 형태·에러 코드 등 상세 스펙은 [docs/api.md](./api.md) 참고.

| 메서드 | 경로                                 | 인증      | 설명                                   |
| ------ | ------------------------------------ | --------- | -------------------------------------- |
| GET    | `/api/chats?page&limit`              | API 키    | 대화 목록 (참여자 포함)                |
| GET    | `/api/chats/:id/messages?page&limit` | API 키    | 대화별 메시지 목록                     |
| GET    | `/api/messages?q&page&limit`         | API 키    | 메시지 검색 (`q` 생략 시 최근 메시지)  |
| GET    | `/api/attachments/:id/file`          | API 키    | 첨부파일 원본                          |
| GET    | `/api/sync/status`                   | API 키    | 동기화 상태 (커서·시각·건수·에러)      |
| POST   | `/api/sync/run`                      | API 키    | 동기화 즉시 실행                       |
| GET    | `/panel`                             | 세션 쿠키 | 초기 설정 / 로그인 / API 키 관리 화면  |
| GET    | `/openapi.json`                      | 공개      | OpenAPI 스펙 (프로덕션 포함 항상 제공) |

## 6. MCP 연동

AI 클라이언트(Claude Code 등)는 `/mcp`(Streamable HTTP)로 접속해 §4 에서 발급받은 것과 같은 API 키로 대화·메시지·첨부파일을 조회하고 동기화를 실행할 수 있다. 연결 설정·도구 목록·사용 흐름은 [docs/mcp.md](./mcp.md) 참고.

## 7. 동작 방식 · 한계

- 동기화 워커가 `SYNC_INTERVAL_MS` 주기로 live chat.db 를 read-only 로 열어 커서(message ROWID) 이후 신규 행만 자체 DB 에 적재한다.
- WAL DB 를 VirtioFS 마운트로 읽는 것은 SQLite 가 보장하지 않으므로, 읽기 실패 시 해당 틱을 건너뛰고 다음 틱에 재시도한다. 커서 기반이라 유실은 없고 지연만 발생한다. 실패 사유는 `/api/sync/status` 의 `lastError` 로 확인한다.
- 신규 macOS 는 메시지 본문이 `text` 가 아닌 `attributedBody`(typedstream) 에 있는 경우가 많다. best-effort 로 추출하며, 실패하면 `text: null` 로 저장된다.
- 기존 행의 갱신(읽음 상태 변화, 메시지 편집, tapback 추가)은 증분 커서로 감지하지 못한다. 최근 윈도 재스캔은 후속 과제.
