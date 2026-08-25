# message-container

macOS Messages(chat.db)를 읽어 조회 API·웹 대시보드·MCP 를 제공하는 Docker 컨테이너 모노레포.

- `apps/server` — Bun + Hono + Drizzle API 서버. `~/Library/Messages` 를 read-only 마운트해 자체 DB(MySQL 기본 · SQLite · PostgreSQL)에 증분 동기화. 조회 전용(발송 불가)
- `apps/web` — Next.js(App Router) + shadcn + Tailwind v4 웹 대시보드. 서버 프리페치 + Hydration 으로 첫 페인트부터 데이터 렌더, flunti-otel 디자인 시스템(사각·플랫·1px 심) 적용
- 보안: 웹에서 초기 패스워드를 설정하면 서버가 `msg_` API 키를 발급하고, 웹은 httpOnly 쿠키로 보관해 프록시로만 API 를 호출
- MCP: AI 클라이언트는 `/mcp`(Streamable HTTP)에 같은 API 키로 접속

## 빠른 시작

```bash
./scripts/smoke-test.sh          # docker compose 기동 + 상태 확인 (docker 만 있으면 됨)
open http://localhost:3001       # 웹에서 초기 패스워드 설정 → 대시보드
```

먼저 Docker Desktop/OrbStack 에 Full Disk Access 를 부여해야 실제 chat.db 를 읽을 수 있다. 상세 절차는 [docs/setup.md](./docs/setup.md), API 스펙 [docs/api.md](./docs/api.md), MCP 가이드 [docs/mcp.md](./docs/mcp.md), 구조 [docs/architecture.md](./docs/architecture.md) 참고.

## 개발

```bash
bun install
bun run typecheck   # 전체 워크스페이스
bun run test        # 전체 워크스페이스
(cd apps/server && bun run dev)                                  # API :3000
(cd apps/web && MESSAGE_API_URL=http://localhost:3000 bun run dev) # 웹 :3001
```
