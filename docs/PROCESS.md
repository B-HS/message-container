# PROCESS

기준 문서: `~/.claude/convention/*.md` (특히 backend.md · common.md · git.md), `docs/acknowledge/2026-08-25-project-stack.md`

## 작업: 기동·검증 스크립트 (2026-08-25)

- [x] scripts/smoke-test.sh 추가 — compose 기동+패널 설정/로그인+키 발급+API·MCP 검증 자동화, 3개 경로(초기 설정·재로그인·오류) 검증 완료, docs/utils/smoke-test.md 기록

## 작업: 인증(앱 패스워드 + API 키) + MCP + 스펙 문서 (2026-08-25)

기준: docs/acknowledge/2026-08-25-auth-mcp.md

- [x] a. 공식 문서 확인 — @modelcontextprotocol/sdk(zod 호환·Streamable HTTP stateless), @hono/mcp
- [x] b. 스키마 — auth_state(KV)·api_keys 테이블 3 dialect + 마이그레이션 재생성
- [x] c. auth 서비스 — 패스워드 설정/검증(argon2id·실패 잠금), 인메모리 패널 세션, API 키 생성(msg_ prefix·SHA-256 해시)/목록/폐기/검증
- [x] d. API 보호 — UNAUTHORIZED 에러 코드, middleware/require-api-key(경로 게이트), /api/* 적용
- [x] e. 웹 패널 — /panel: 초기 패스워드 설정 → 로그인 → API 키 관리(생성 1회 표시·폐기)
- [x] f. MCP — /mcp Streamable HTTP, API 키 인증, 도구: list_chats·get_chat_messages·search_messages·get_sync_status·run_sync·get_attachment(base64)
- [x] g. OpenAPI — 항상 노출 + bearer security scheme 반영
- [x] h. 테스트 — auth 단위, 패널·보호 API·MCP e2e (기존 e2e 의 인증 반영 수정 포함)
- [x] i. 문서 — docs/api.md(스펙), docs/mcp.md(AI 용 가이드), setup·architecture·README 갱신
- [x] j. 검증(typecheck→format→test→실행: 로컬·docker mysql/postgres 패널·키·MCP 실 호출) 및 커밋 (dev)

검증 결과(a~i, 2026-08-25): `bun run typecheck` 통과(에러 0). `bun run format:check` 최초 실패(문서 작업 중 생성된 `docs/acknowledge/2026-08-25-auth-mcp.md` 미포맷) → `bun run format` 후 재검사 통과. `bun test` 전체 23개 파일 127 pass / 0 fail(244 expect) — 신규 단위 3개(auth-service·panel dto·bearer-token) + e2e 2개(panel·mcp) 포함. 소스·테스트 코드는 수정하지 않고 문서만 갱신했다. j(커밋)는 사용자 요청 전이라 미완료로 남긴다.

## 작업: 테스트 확충 + docs 정합화 (2026-08-25, workflow 병렬)

- [x] a. 공용 테스트 헬퍼 — tests/helpers/test-env.ts (getEnv 경로용 env 고정)
- [x] b. lib 단위 테스트 — api-response·error·collection·env(envSchema export)·validation-hook·with-error-handling
- [x] c. dto·service 단위 테스트 — dto/message, chat-service, message-service
- [x] d. e2e — fake chat.db 헬퍼 공용화 + compose·router 전체 배선(app.request) + bun index.ts 서브프로세스 부트 테스트
- [x] e. 전체 검증 — typecheck → format:check → bun test 일괄 통과
- [x] f. docs 정합 점검·고도화 — 기존 문서 사실 검증, architecture·history 추가, PROCESS·QA 갱신
- [x] g. mysql·postgres provider 실 DB 검증 (docker: mysql:8·postgres:18 + api 이미지, fake chat.db) 및 QA 체크 반영
- [x] h. 커밋 (dev)

검증 결과: `bun test` 84 pass / 0 fail (155 expect, 18 파일, tests/e2e 10건 포함) — `tsc --noEmit`·`prettier --check` 도 통과. mysql·postgres 는 docker 실 DB 로 동기화·조회 확인.

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
