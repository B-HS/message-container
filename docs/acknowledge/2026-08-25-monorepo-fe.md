# 모노레포 전환 · FE 신설 합의 (2026-08-25)

## 결정

| 항목        | 결정                                                                                                                                                                                                                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 레이아웃    | Bun workspaces 모노레포 — `apps/server`(기존 BE 이동, 무수정) + `apps/web`(신규 FE)                                                                                                                                                                                                                                                              |
| FE 스택     | Next.js(App Router) + shadcn/ui(new-york) + Tailwind v4 + TanStack Query v5 + React Compiler                                                                                                                                                                                                                                                     |
| FE 인증     | localStorage 사용 금지. **초기설정·로그인은 전부 FE 에서 수행해 BE 로 기록**(사용자 후속 지시): FE 설정/로그인 화면 → BE JSON auth API(`/api/auth/status·setup·login`, 공개) → 로그인 성공 시 BE 가 API 키 발급 → FE 가 httpOnly 쿠키로 보관 → Next 프록시 라우트(`/api/be/*`)가 쿠키의 키를 Authorization 으로 주입. 클라이언트 JS 에 키 비노출 |
| 데이터 로딩 | 서버 컴포넌트 `prefetchQuery` + `HydrationBoundary` + `useSuspenseQuery` 를 적극 활용해 SSR↔CSR hydration 을 정확히 맞추고 첫 페인트 blink 최소화                                                                                                                                                                                                |
| 로딩 UI     | 스피너 금지 — 스켈레톤만 (DESIGN.md 규칙과 일치)                                                                                                                                                                                                                                                                                                 |
| 디자인      | DESIGN.md(flunti-otel) Surface A 디자인 시스템 적용 — radius 0(사각), 표면 무보더·무섀도, 1px 심 분리, 3계층 깊이(sidebar<body<card), 모노크롬 우선, font-bold 금지(400/500/600), 기계값 mono, 모션 0.18s/0.24s 두 패턴만, 차트 무애니메이션, 이모지 금지                                                                                        |
| 쉘          | 좌측 레일만 (우측 컨텍스트 패널 생략 — 글로벌 필터 실수요 없음). 헤더 없음                                                                                                                                                                                                                                                                       |
| MVP 화면    | 5개 — 대화 목록 / 대화 상세(메시지+첨부 이미지) / 메시지 검색 / 동기화 상태 / 설정(연결 상태 — 키는 env 이므로 입력 화면 대신 연결 확인)                                                                                                                                                                                                         |
| 테마        | next-themes(class 전략, system 비활성 — DESIGN.md: 미설정 시 light), `.dark` + `[data-theme='dark']` 지원                                                                                                                                                                                                                                        |
| FE 구조     | fsd.md 변형 FSD — app(Next 라우트)/widgets/features/entities/shared, barrel 금지, alias=레이어                                                                                                                                                                                                                                                   |

## 후속 지시로 인한 변경 (같은 날)

- `scripts/smoke-test.sh` 에서 패스워드 입력 제거 — 의존성은 docker 뿐, 기동·보호(401)·스펙 노출 확인만 수행
- BE "무수정" 전제 해제: FE 주도 초기설정을 위해 BE 에 공개 JSON auth API(`GET /api/auth/status`, `POST /api/auth/setup`, `POST /api/auth/login`) 추가. setup/login 성공 시 API 키를 JSON 으로 발급(웹 세션용). 기존 `/panel` HTML 은 키 관리 용도로 유지
- FE 는 발급 키를 httpOnly·SameSite=Lax 쿠키에 저장(브라우저 JS 접근 불가), SSR 프리페치 시 서버가 쿠키를 읽어 BE 호출

## 근거

- SSR 프리페치가 요구사항이므로 API 키는 서버에만 있어야 함 → 프록시가 유일 해법 (BE 무수정 유지)
- 첨부 이미지도 `/api/be/attachments/:id/file` 프록시 경유로 클라이언트 키 없이 렌더 가능
- DESIGN.md 의 Surface B(공개 페이지)는 BE 의 /panel 이 담당 중이므로 FE 에는 Surface A 만 적용
