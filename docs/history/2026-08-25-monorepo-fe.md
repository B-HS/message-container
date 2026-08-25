# 2026-08-25 — 모노레포 전환 + 웹 대시보드 신설

## 한 일

1. **모노레포 전환** — BE 전체를 `apps/server` 로 이동, 루트 bun workspaces(`apps/*`) 구성. Docker 빌드를 워크스페이스 루트 컨텍스트 + `bun install --filter` 로 전환, 마이그레이션 경로를 cwd 독립적으로 수정
2. **공개 JSON auth API** — FE 주도 초기설정을 위해 `GET /api/auth/status`, `POST /api/auth/setup`, `POST /api/auth/login` 추가 (성공 시 API 키 발급). `smoke-test.sh` 는 패스워드 없이 기동·상태 확인만 수행하도록 축소
3. **웹 대시보드(`apps/web`)** — Next.js(App Router, React Compiler, standalone) + shadcn(new-york) + Tailwind v4 + TanStack Query v5. DESIGN.md(flunti-otel Surface A) 토큰 전면 적용(radius 0·무보더·1px 심·3계층). 화면: setup(초기설정/로그인) · 대화 목록 · 대화 상세(메시지+첨부 이미지) · 메시지 검색 · 동기화 · 설정. 전 페이지 서버 `prefetchQuery` + `HydrationBoundary` + `useSuspenseQuery`, 로딩은 스켈레톤만
4. **FE 인증** — 발급 키를 httpOnly 쿠키에 저장, `/api/be/[...path]` 프록시가 서버측에서 Authorization 주입 (클라이언트 JS 에 키 비노출). 쿠키 없으면 `/setup` 리다이렉트
5. **BE 보강** — `GET /api/chats/:id`(상세 헤더용), `GET /api/attachments?messageIds=`(첨부 메타 일괄) 추가
6. **compose** — `web` 서비스 추가 (기본 `:3001`, `MESSAGE_API_URL=http://api:3000`)

## 검증

- 서버 132 테스트 그린, 웹 typecheck·build·단위 테스트 그린
- 로컬·Docker 양쪽에서 setup → 쿠키 → `/chats` SSR(첫 HTML 에 실데이터 포함) → 프록시 → 로그아웃 리다이렉트 전 구간 확인

커밋 상세는 dev 브랜치 git log 참조.
