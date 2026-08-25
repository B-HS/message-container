# 2026-08-25 — 반응형·보안 마감

## 한 일

1. **반응형** — 웹 쉘에 768px 단일 브레이크 적용: 모바일에서 레일 숨김 + 48px 헤더(트리거) + 288px 오버레이 드로어(50% 스크림·Escape 닫기). DESIGN.md §13 준수
2. **웹 보안** — next.config 보안 헤더 4종 + `poweredByHeader` 제거, `/api/session`·프록시 POST 에 Origin 검증(403), 로그아웃 시 BE 키 폐기 후 쿠키 삭제
3. **API 보안** — hono `secureHeaders()` 전역 적용, `POST /api/auth/revoke`(제시한 키 자기 폐기) 추가 + e2e
4. **컨테이너** — api·web 이미지 non-root(`USER bun`) 전환, sqlite 볼륨 쓰기 검증
5. **마감** — `(shell)/error.tsx` 에러 바운더리(로드 실패 카드 + 재시도, 401 은 /setup 리다이렉트), 앱 아이콘 추가

## 검증

server 133 · web 6 테스트, typecheck·build 그린. docker 실 기동으로 보안 헤더·Origin 403·로그아웃 폐기 후 401·non-root·모바일 트리거 SSR 렌더 전부 확인 — 상세는 docs/quality-assurance/security-responsive.md.
