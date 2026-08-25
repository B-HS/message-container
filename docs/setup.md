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

## 4. API

| 메서드 | 경로                                 | 설명                                  |
| ------ | ------------------------------------ | ------------------------------------- |
| GET    | `/api/chats?page&limit`              | 대화 목록 (참여자 포함)               |
| GET    | `/api/chats/:id/messages?page&limit` | 대화별 메시지 목록                    |
| GET    | `/api/messages?q&page&limit`         | 메시지 검색 (`q` 생략 시 최근 메시지) |
| GET    | `/api/attachments/:id/file`          | 첨부파일 원본                         |
| GET    | `/api/sync/status`                   | 동기화 상태 (커서·시각·건수·에러)     |
| POST   | `/api/sync/run`                      | 동기화 즉시 실행                      |

비프로덕션에서는 `/openapi.json` 으로 OpenAPI 스펙을 확인할 수 있다.

## 5. 동작 방식 · 한계

- 동기화 워커가 `SYNC_INTERVAL_MS` 주기로 live chat.db 를 read-only 로 열어 커서(message ROWID) 이후 신규 행만 자체 DB 에 적재한다.
- WAL DB 를 VirtioFS 마운트로 읽는 것은 SQLite 가 보장하지 않으므로, 읽기 실패 시 해당 틱을 건너뛰고 다음 틱에 재시도한다. 커서 기반이라 유실은 없고 지연만 발생한다. 실패 사유는 `/api/sync/status` 의 `lastError` 로 확인한다.
- 신규 macOS 는 메시지 본문이 `text` 가 아닌 `attributedBody`(typedstream) 에 있는 경우가 많다. best-effort 로 추출하며, 실패하면 `text: null` 로 저장된다.
- 기존 행의 갱신(읽음 상태 변화, 메시지 편집, tapback 추가)은 증분 커서로 감지하지 못한다. 최근 윈도 재스캔은 후속 과제.
