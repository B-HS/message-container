# message-container

macOS Messages(chat.db)를 읽어 조회 API 를 제공하는 Docker 컨테이너.

- 컨테이너가 `~/Library/Messages` 를 read-only 마운트하고, 주기적으로 신규 메시지만 자체 DB(MySQL 기본 · SQLite · PostgreSQL 선택)에 증분 동기화한다.
- Bun + Hono + Drizzle. 조회 전용(발송 불가).
- 보안: 웹 패널(`/panel`)에서 초기 패스워드를 설정하고 `msg_` prefix API 키를 발급해야 `/api/*` 를 호출할 수 있다.
- MCP: AI 클라이언트(Claude Code 등)는 `/mcp`(Streamable HTTP)로 접속해 같은 API 키로 대화·메시지·첨부파일을 조회할 수 있다.

## 빠른 시작

```bash
docker compose up -d --build
open http://localhost:3000/panel   # 초기 패스워드 설정 → API 키 발급
curl -H "Authorization: Bearer msg_..." http://localhost:3000/api/sync/status
```

먼저 Docker Desktop/OrbStack 에 Full Disk Access 를 부여해야 한다. 상세 절차·인증 설정은 [docs/setup.md](./docs/setup.md), API 스펙은 [docs/api.md](./docs/api.md), MCP 가이드는 [docs/mcp.md](./docs/mcp.md) 참고.
