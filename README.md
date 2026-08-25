# message-container

macOS Messages(chat.db)를 읽어 조회 API 를 제공하는 Docker 컨테이너.

- 컨테이너가 `~/Library/Messages` 를 read-only 마운트하고, 주기적으로 신규 메시지만 자체 DB(MySQL 기본 · SQLite · PostgreSQL 선택)에 증분 동기화한다.
- Bun + Hono + Drizzle. 조회 전용(발송 불가).

## 빠른 시작

```bash
docker compose up -d --build
curl http://localhost:3000/api/sync/status
```

먼저 Docker Desktop/OrbStack 에 Full Disk Access 를 부여해야 한다. 상세 절차·API 목록·한계는 [docs/setup.md](./docs/setup.md) 참고.
