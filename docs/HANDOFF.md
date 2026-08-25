# HANDOFF — 2026-08-25 세션 스냅샷

> 새 세션의 단일 진입점. 이 문서와 링크된 문서만 읽으면 이전 세션 상태가 복원된다.
> 기준: dev = prod 동일 커밋, chore/containers = dev + `compose.containers.yaml` 1파일. 원격 `github.com/B-HS/message-container` 에 3개 브랜치 모두 push 됨.

## 1. 프로젝트 한 줄 정의

macOS 의 Messages(chat.db)를 읽기 전용으로 증분 동기화해 웹 대시보드(Next.js) · REST API(Hono) · MCP 로 제공하는 셀프호스팅 Docker 모노레포 (`apps/server` + `apps/web`, bun workspaces).

## 2. 현재 목표

- 최종 목표: 개인용 Messages 조회 스택 완성 — v1 완결 후 후속 기능 확장 중
- 현재 마일스톤: 없음(전부 완료·검증). 남은 것은 §8 후속 과제뿐
- 직전 작업: 기존 행 갱신 감지(최근 윈도 재스캔 — 편집·읽음·tapback) + 로깅 시스템(DB 적재·/api/logs·FE 로그 메뉴) + db 3306 비노출 + 쿠키명 msg_api_key 교정 + README 스크린샷 재촬영

## 3. 완료 / 진행 중 / 미착수

**완료 (전부 커밋·검증됨)** — 시간순 상세는 `docs/history/` 8개 파일:

1. BE 코어: chat.db 리더(커서 증분·typedstream 본문 추출·WAL 실패 틱 스킵) → 3-provider(sqlite 기본·mysql·pg, Drizzle) 적재 → 조회 API. `apps/server/service/`·`compose/provider/`
2. 인증: 앱 패스워드(argon2id) + `msg_` API 키(SHA-256 해시 저장) + `/panel` HTML + `/api/*` Bearer 게이트(`middleware/require-api-key.ts`) + 공개 JSON auth API(`route/auth.ts`: status·setup·login·revoke) + 키 관리 API(`route/key.ts`)
3. MCP: `/mcp` Streamable HTTP, 도구 6종, 키 인증 (`route/mcp.ts`)
4. FE: Next 16(App Router·React Compiler·standalone) + shadcn + Tailwind v4 + TanStack Query v5, FSD(`app/widgets/features/entities/shared`), DESIGN.md(flunti-otel Surface A) 토큰 전면 적용. 화면: setup / 대화 목록(병합·미리보기) / 대화 상세(AI Elements 말풍선·첨부 인라인) / 검색 / 동기화 / 설정(키 관리·origin 기반 주소). 전 페이지 서버 prefetch + HydrationBoundary + useSuspenseQuery
5. FE 인증: httpOnly 쿠키(`msg_api_key`) + `/api/be/[...path]` 프록시(서버측 키 주입) + `/api/session`(로그인=BE 키 발급, 로그아웃=BE revoke)
6. 보안·반응형: 보안 헤더(web headers()/api secureHeaders), Origin 검증, non-root 컨테이너(+`/data` bun 소유), 768px 모바일 드로어
7. 대화 로직 3연타 수정: ROWID→최근 메시지 정렬 → identifier 기준 SMS/iMessage 병합(`chat-service.ts` 도메인 로직, `chatIds` 로 상세도 병합) → 빈 문자열 displayName/identifier null 정규화
8. 운영: **단일 origin 노출 모델** — 웹 32000 만 노출, BE 33000 은 내부 전용(웹이 `/api/be`·`/mcp`·`/openapi.json` 프록시, Bearer 패스스루), MySQL 3306 도 호스트 비노출. `scripts/smoke-test.sh`(무입력·웹 origin 기준), README(데모 스크린샷), `chore/containers` 브랜치(`compose.containers.yaml`)
9. 행 갱신 감지 + 로깅: 매 틱 최근 500행 재스캔(커서 무전진, upsert 재사용)으로 편집·읽음 반영, messages 에 isRead·dateReadMs·associated\* 컬럼(마이그레이션 0002), `LogService` + `/api/logs` + FE "로그" 메뉴, tapback 말풍선 배지·"읽음" 마커 — `architecture.md §8.1·§10`, `history/2026-08-25-row-update-logging.md`

**진행 중**: 없음.

**미착수**: §8 참조.

## 4. 의사결정 요약 (상세: docs/acknowledge/ 6개 파일)

채택:

- bun workspaces 모노레포, Hono/Drizzle/Next/shadcn 스택 — `acknowledge/2026-08-25-project-stack.md`, `-monorepo-fe.md`
- 자체 앱 패스워드 + API 키 인증, MCP 동일 키 — `acknowledge/2026-08-25-auth-mcp.md`
- FE 프록시 인증(쿠키) + SSR prefetch — `-monorepo-fe.md`
- 대화 병합은 chat-service 도메인 로직 (provider 는 행 통계만) — `history/2026-08-25-chat-merge.md`
- containers 통합은 패널 Deployment 가 아닌 1급 compose + `chore/containers` 브랜치(compose 만 브랜치 전용, docs 는 dev 와 동일) — `acknowledge/2026-08-25-containers-branch.md`
- 단일 origin 프록시 모델(BE 비노출, 웹이 API·MCP 중계, CORS 는 옵트인) — `acknowledge/2026-08-25-single-origin-proxy.md`
- 행 갱신 감지는 매 틱 500행 재스캔(C안: 편집+읽음+tapback), 로깅은 DB 적재+FE 화면 — `acknowledge/2026-08-25-row-update-logging.md`
- 브랜치: dev(작업)·prod(main 역할, dev 를 ff 로 따라감)·chore/containers(dev merge 로 갱신)

기각된 대안 (같은 삽질 금지):

- **better-auth** — 개인용 단일 사용자에 과함 (auth-mcp acknowledge)
- **localStorage 키 보관** — 사용자 명시 거부 + SSR prefetch 불가능
- **containers 패널 Deployment 로 배포** — 패널 정책이 호스트 바인드 마운트(`HOST_BIND_MOUNT`) 거부, chat.db 마운트 필수라 불가 (`docs/containers-integration.md`)
- **우측 컨텍스트 패널(DESIGN 3열)** — 글로벌 필터 실수요 없음
- **스피너** — 스켈레톤만 (DESIGN 규칙 + 사용자 지시)
- **git 히스토리 재작성(.next blob 제거)** — force push 금지라 보류, 과거 커밋에 빌드 산출물 blob 잔존

## 5. 사용자 방향성 & 작업 규칙

- 한국어 존댓말, 간결. 전역 컨벤션(`~/.claude/convention/*.md`) + hook 강제(arrow-fn·주석 금지·any 금지·throw new Error 금지 등)
- **전부 TypeScript strict** — JS 소스 발견 시 사용자 격노 (실은 .next 산출물 커밋이 오해 원인이었음)
- **스켈레톤만**(스피너 금지), **SSR prefetch + hydration 으로 첫 페인트 blink 금지**, **localStorage 금지**
- **관리 기능은 FE 에서 완결** — "BE 패널 가서 하라" 식 안내 금지. 연결·MCP 주소는 **브라우저 origin 기반**으로 표시
- 커밋·push 패턴: auto-commit 합의됨. "다 해놔" 지시 시 dev push + prod ff-merge push (+ 필요 시 chore/containers merge push)
- **검증 없이 완료 보고 금지** — typecheck→prettier→test(+실기동 스모크) 사다리, 실 DB(mysql/pg docker)까지 확인하는 습관
- 병렬 가능한 큰 작업(테스트 확충·문서화)은 **Workflow + sonnet** 병렬 선호
- **포트 번호로 프로세스 kill 절대 금지** — compose 포트 리스너는 `com.docker.backend`라 Docker 데몬이 죽음. 사고 2회 (`docs/feedback/2026-08-25-port-kill-docker-daemon.md`). 실행 중 스택(33000/32000) 무접촉, 테스트는 34xxx 대역 + PID 지정 종료
- 스크린샷 등 산출물에 **실제 메시지 데이터 노출 금지** — 데모 fake chat.db 사용

## 6. 미해결 질문 / 사용자 확인 필요

- 없음. (과거 커밋의 .next blob 정리는 force push 가 필요해 사용자가 원할 때만 — §4 기각 항목)

## 7. 환경 & 전제

- macOS(Apple Silicon) + Docker Desktop 4.83(FDA 부여됨), Bun 1.3.x, TS 7.0.2(`baseUrl` 제거됨 주의), Next 16.3.2, Drizzle 0.45.2, MCP SDK 1.30(zod4 직접 지원), hono-openapi(peer `@hono/standard-validator` 필수)
- 실행: `./scripts/smoke-test.sh` → `localhost:32000` 초기설정. 개발: 각 앱 디렉토리에서 `bun run dev`. 루트 `bun run typecheck|test` 는 워크스페이스 필터 실행
- 함정 기록: drizzle SELECT 필드 내 컬럼 참조는 비정규화 렌더 → 상관 서브쿼리는 리터럴 식별자 사용(`history/2026-08-25-chat-ordering.md`) / chat.db 는 `display_name` 등에 `''` 저장 / message.date 는 ns·s 혼재(SQL 에서 판별) / bun-sqlite drizzle 트랜잭션은 동기 콜백 / `.env.example` 은 권한 훅이 차단 → `env.example` 사용
- 사용자 실 스택이 이 머신에서 compose 로 상시 실행 중 (실데이터 776 대화·6천+ 메시지 동기화 검증됨)

## 8. 다음 세션 TODO (우선순위 순)

1. (후속) FE 레일 접힘(48px)·Cmd+B — DESIGN.md §10-11 대비 단순화된 부분. `apps/web/widgets/rail/rail.tsx`
2. (후속) CSP 도입(Next nonce 체계)·https 배포 시 쿠키 `Secure` — `docs/quality-assurance/security-responsive.md` 미체크 2건
3. (후속) FE 테스트 확충(현재 6개: format·envelope 단위뿐) — 위젯·프록시·세션 라우트
4. (선택) 대화 목록 UX — 안 읽음 표시(행 갱신 감지 완료로 선행 조건 해소됨, `isRead` 데이터 사용 가능)
5. (선택) 재스캔 윈도(500행) 밖의 늦은 읽음 처리·편집은 미반영 — 필요해지면 전체 재스캔 명령 추가 검토

## 9. 문서 지도

| 문서                             | 내용                                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `docs/HANDOFF.md`                | (이 문서) 세션 스냅샷                                                                         |
| `docs/PROCESS.md`                | 작업 체크리스트 누적 (세션 연속성, 최신 작업이 위)                                            |
| `docs/architecture.md`           | 계층·데이터 흐름·provider·에러 체계·인증·MCP 구조                                             |
| `docs/api.md`                    | REST API 스펙 (인증 흐름·엔드포인트·병합된 ChatSummary·에러 코드표·curl)                      |
| `docs/mcp.md`                    | AI 용 MCP 가이드 (연결 설정·도구 6종·한계)                                                    |
| `docs/setup.md`                  | 실행 가이드 (FDA·smoke-test·provider 변형·문제 해결)                                          |
| `docs/testing.md`                | 테스트 분류·실행법·헬퍼 (server 152 · web 6)                                                  |
| `docs/containers-integration.md` | containers 패널 호스트 통합 (chore/containers 브랜치 사용법)                                  |
| `docs/acknowledge/`              | 의사결정 6건 (스택 / auth·MCP / 모노레포·FE / containers 브랜치 / 단일 origin / 행 갱신·로깅) |
| `docs/history/`                  | 시간순 작업 이력 8건                                                                          |
| `docs/feedback/`                 | 교정 1건 — 포트 기준 kill 금지 (Docker 데몬 사고)                                             |
| `docs/quality-assurance/`        | 검증 체크리스트 2건 (provider 실연동 / 보안·반응형)                                           |
| `docs/utils/smoke-test.md`       | 기동 스크립트 사용법                                                                          |

## 복기 신뢰도

세션 전체(초기 구축→핸드오프)를 커밋 로그·docs 와 대조해 작성했으며 낮은 신뢰도 구간 없음. 세부 수치(테스트 개수 등)는 각 시점 기록이 `docs/history/`·`docs/PROCESS.md` 에 있다.
