# DB provider 검증 체크리스트

provider 선택형 DB 구현의 실 연동 검증 상태. sqlite 는 자동 테스트로 상시 검증되고, mysql·postgres 는 실 DB 기동이 필요해 별도 확인한다.

## 항목

- [x] sqlite — `tests/compose/sqlite-provider.test.ts` (마이그레이션 + saveBatch 멱등 + 조회/검색) 로 상시 검증
- [ ] mysql — 확인 방법: `docker compose up -d --build` 후 `curl localhost:3000/api/sync/status` 로 counts 증가 확인, `curl localhost:3000/api/chats` 정상 응답 확인. 기대: sqlite 와 동일 응답 구조
- [ ] postgres — 확인 방법: 로컬 Postgres 기동 후 `DB_PROVIDER=postgres DATABASE_URL=postgres://... bun index.ts` 로 위와 동일 확인
- [ ] 실 chat.db — 확인 방법: Docker Desktop/OrbStack 에 Full Disk Access 부여(docs/setup.md §1) 후 compose 기동, `/api/sync/status` 의 `lastError` 가 null 이고 counts 가 실제 메시지 수와 일치하는지 확인
- [ ] attributedBody 추출률 — 확인 방법: 실 chat.db 동기화 후 `SELECT count(*) FROM messages WHERE text IS NULL` 비율 확인. 기대: 대부분의 텍스트 메시지에서 text 채워짐 (스티커·tapback 등은 null 허용)
