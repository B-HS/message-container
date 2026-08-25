# PROCESS

기준 문서: `~/.claude/convention/*.md` (특히 backend.md · common.md · git.md), `docs/acknowledge/2026-08-25-project-stack.md`

## 작업: message-container 초기 구축 (2026-08-25) — 완료

- [x] a. 스택·환경 합의 및 기록 — docs/acknowledge, git init + auto-commit 설정
- [x] b. 프로젝트 스캐폴드 — package.json, tsconfig, prettier.config.js, .gitignore, env.example (`.env.example` 은 권한 설정상 쓰기가 차단되어 `env.example` 로 대체)
- [x] c. 공식 문서 확인 — Drizzle(bun-sqlite·mysql2·bun-sql pg), hono-openapi(validator·describeRoute·openAPIRouteHandler, peer `@hono/standard-validator` 필요)
- [x] d. lib — getEnv, error 3파일, api-response(+errorResponses), with-error-handling, validation-hook, apple-time, typedstream, collection
- [x] e. db — 스키마 3 dialect(schema.sqlite/mysql/pg), createDbClient + runMigrations, drizzle 마이그레이션 생성
- [x] f. chat.db reader — service/shared/chat-db-reader.ts (read-only + Zod 경계 검증 + ns/s date 변환은 SQL 에서 처리, 실패 시 SYNC_SOURCE_UNAVAILABLE)
- [x] g. sync — sync-service(커서 루프·typedstream 추출·saveBatch 원자화) + index.ts interval 워커(중복 실행 가드)
- [x] h. API — /api/chats, /api/chats/:id/messages, /api/messages, /api/attachments/:id/file, /api/sync/status, /api/sync/run
- [x] i. compose — provider 별 ServiceDb 구현(sqlite/mysql/pg) 조립, index.ts 부트스트랩(+비프로덕션 /openapi.json)
- [x] j. Docker — Dockerfile, docker-compose.yml(mysql 기본)·docker-compose.sqlite.yml, docs/setup.md(FDA 절차)
- [x] k. 검증 — typecheck·prettier·bun test 34개 통과, 가짜 chat.db 스모크(로컬 + Docker 컨테이너 실행) 통과

### 검증 기록

- `bun run typecheck` / `bun run format:check` / `bun test` (34 pass) 통과
- 가짜 chat.db 로 로컬 서버·Docker 컨테이너 모두 기동해 sync/조회/검색/404/validation 응답 확인
- MySQL·PostgreSQL provider 는 타입 수준 검증만 완료 — 실 DB 연동 확인은 후속 과제 (docs/quality-assurance 참고)

### 후속 과제

- 기존 행 갱신(읽음 상태·메시지 편집·tapback) 감지 — 최근 윈도 재스캔
- MySQL/PostgreSQL 실 DB 연동 검증 (compose 로 mysql 기동 후 확인)
- 대화 목록의 최근 메시지 기준 정렬(lastMessageAt)
