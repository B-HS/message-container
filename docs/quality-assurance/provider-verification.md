# DB provider 검증 체크리스트

provider 선택형 DB 구현의 실 연동 검증 상태. sqlite 는 자동 테스트로 상시 검증되고, mysql·postgres 는 실 DB 기동이 필요해 별도 확인한다.

## 항목

- [x] sqlite — `tests/compose/sqlite-provider.test.ts`(마이그레이션 + saveBatch 멱등 + 조회/검색), `tests/e2e/api.e2e.test.ts`(fake chat.db 시딩 → sync → compose·router 전체 배선을 `app.request` 로 호출), `tests/e2e/server-boot.e2e.test.ts`(`bun index.ts` 실 프로세스 부트 후 HTTP 로 상태·OpenAPI·API 확인) 로 상시 검증
- [x] mysql — 2026-08-25 확인: docker 네트워크에서 `mysql:8` + api 이미지를 fake chat.db 로 기동, 마이그레이션·동기화(cursor 2·counts 일치·lastError null)·`/api/chats`·`/api/chats/:id/messages` 정상. 재확인 방법: `docker compose up -d --build` 후 `curl localhost:3000/api/sync/status`
- [x] postgres — 2026-08-25 확인: `postgres:18.3-alpine` + api 이미지(bun-sql 드라이버)로 동일 절차 수행, 동기화·조회·검색 정상. 재확인 방법: `DB_PROVIDER=postgres DATABASE_URL=postgres://... bun index.ts`
- [ ] 실 chat.db — 확인 방법: Docker Desktop/OrbStack 에 Full Disk Access 부여(docs/setup.md §1) 후 compose 기동, `/api/sync/status` 의 `lastError` 가 null 이고 counts 가 실제 메시지 수와 일치하는지 확인
- [ ] attributedBody 추출률 — 확인 방법: 실 chat.db 동기화 후 `SELECT count(*) FROM messages WHERE text IS NULL` 비율 확인. 기대: 대부분의 텍스트 메시지에서 text 채워짐 (스티커·tapback 등은 null 허용)
