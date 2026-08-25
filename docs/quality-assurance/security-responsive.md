# 보안·반응형 검증 체크리스트

2026-08-25 반응형·보안 마감 작업의 검증 상태. 전 항목 docker 컨테이너(api+web) 실 기동으로 확인했다.

## 보안

- [x] 웹 보안 헤더 — `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` 응답 확인, `X-Powered-By` 제거
- [x] API 보안 헤더 — hono `secureHeaders()` (nosniff·SAMEORIGIN·no-referrer 등) 응답 확인
- [x] CSRF — 세션·프록시 POST 에 Origin 검증(불일치 403 확인) + httpOnly·SameSite=Lax 쿠키 (키는 클라이언트 JS 비노출)
- [x] 로그아웃 시 키 폐기 — DELETE /api/session 이 BE `/api/auth/revoke` 를 호출, 폐기된 쿠키로 프록시 호출 시 401 확인 (키 누적 방지)
- [x] 컨테이너 non-root — api·web 모두 `USER bun` 으로 동작, sqlite `/data` 볼륨 쓰기 정상
- [x] 로그인 브루트포스 — BE 5회 연속 실패 시 30초 잠금(429), e2e 로 상시 검증
- [x] 경로 탈출 — 첨부 파일 경로 traversal 가드 (기존 e2e 유지)
- [ ] CSP — 미적용 (Next inline 스크립트 nonce 체계 필요, 후속 과제). 로컬 개인용 전제에서 위험도 낮음
- [ ] 쿠키 `Secure` 플래그 — http 로컬 배포가 기본이라 미적용. https 뒤에 둘 경우 활성화 필요 (docs/setup.md 참고)

## 반응형 (DESIGN.md §13 — 단일 768px 브레이크)

- [x] <768px: 좌측 레일 숨김 + 상단 48px 모바일 헤더(트리거) + 288px 오버레이 드로어(50% 스크림, Escape·스크림·항목 클릭으로 닫힘) — SSR HTML 에 트리거 렌더 확인
- [x] ≥768px: 고정 레일 256px, 헤더 없음 (기존 유지)
- [x] 테이블 — 고정 컬럼폭 + 유연 컬럼 `max-w-0 truncate` + `overflow-x-auto` (쉘 확장 없음)
- [x] 타일 그리드 — 2열 → md 4열
- [x] setup·설정 화면 — 유동 폭 카드
