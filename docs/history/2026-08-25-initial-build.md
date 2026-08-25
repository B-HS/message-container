# 2026-08-25 — 초기 구축 이력

message-container 프로젝트의 첫 작업일 요약. 커밋 단위 상세는 이 저장소의 `git log`(`dev` 브랜치) 참고 — 여기서는 두 작업 묶음의 흐름만 간단히 기록한다.

## 1. 초기 구축

스택·환경 합의([docs/acknowledge/2026-08-25-project-stack.md](../acknowledge/2026-08-25-project-stack.md))를 시작으로, Bun + Hono + Drizzle 백엔드를 처음부터 구축했다.

- 스캐폴드(`package.json`·`tsconfig.json`·`prettier.config.js`·`env.example`) 및 공식 문서 확인(Drizzle bun-sqlite/mysql2/bun-sql, hono-openapi)
- `lib/` 횡단 유틸(`env`·에러 3파일·`api-response`·`with-error-handling`·`validation-hook`·`apple-time`·`typedstream`·`collection`)
- `db/` 3 dialect 스키마(sqlite/mysql/pg) + 마이그레이션 생성
- `service/shared/chat-db-reader.ts` — chat.db read-only 읽기 + Zod 경계 검증
- `service/domain/message/sync-service.ts` — 커서 루프·typedstream 추출·`saveBatch` 원자화, `index.ts` 의 interval 워커(중복 실행 가드)
- API 6종(`/api/chats`, `/api/chats/:id/messages`, `/api/messages`, `/api/attachments/:id/file`, `/api/sync/status`, `/api/sync/run`)
- `compose/` — provider(sqlite/mysql/pg)별 `ServiceDb` 구현 조립, `index.ts` 부트스트랩(+ 비프로덕션 `/openapi.json`)
- Docker(`Dockerfile`, `docker-compose.yml`(mysql 기본)·`docker-compose.sqlite.yml`), `docs/setup.md`(Full Disk Access 절차)
- 검증: `typecheck`·`prettier`·`bun test` 34개 통과, 가짜 chat.db 로 로컬·Docker 컨테이너 스모크 테스트 통과

이 단계에서 mysql·postgres provider 는 타입 수준까지만 검증되었고, 실 DB 연동 확인은 후속 과제로 남았다.

## 2. 테스트 확충 + docs 정합화

초기 구축에서 남은 테스트 공백과 문서 정합성을 보강했다(`docs/PROCESS.md` 의 "테스트 확충 + docs 정합화" 작업, workflow 병렬 진행).

- 공용 테스트 헬퍼(`tests/helpers/test-env.ts`) 및 lib·dto·service 단위 테스트 확충
- fake chat.db 헬퍼(`tests/helpers/fake-chat-db.ts`) 공용화, `app.request()` 기반 API 전체 배선 e2e, `bun index.ts` 서브프로세스 부트 e2e 추가
- 결과: `bun test` 84 pass / 0 fail(155 expect, 18 파일)로 typecheck·format:check 와 함께 전부 통과
- 기존 문서(README·setup·acknowledge·PROCESS·QA)를 실제 코드와 대조 검증하고, `docs/architecture.md`·`docs/testing.md` 신설 및 `docs/PROCESS.md`·`docs/quality-assurance/provider-verification.md` 갱신

mysql·postgres provider 의 실 DB 검증(Docker 기동 필요)과 커밋은 이 시점까지 미완료 상태로 `docs/PROCESS.md` 체크리스트에 남아 있다.
