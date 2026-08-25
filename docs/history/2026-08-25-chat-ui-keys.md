# 2026-08-25 — 대화 UI 고도화 · 설정 화면 FE 완결

## 한 일

1. **대화 상세 말풍선 UI** — 테이블 원장을 AI Elements(shadcn 레지스트리) 기반 대화 뷰로 교체: `Conversation`(stick-to-bottom 자동 스크롤·스크롤 버튼) + `Message/MessageContent` 말풍선(내 메시지 우측 primary, 상대 좌측 secondary), 그룹 대화 발신자 라벨, 시각 라벨, 첨부 이미지 말풍선 내 인라인·파일 링크. 페이지 내 표시 순서는 과거→최신, 헤더에 페이저. streamdown 등 미사용 무거운 의존성은 제거하고 conversation/message 만 경량 유지(use-stick-to-bottom 만 추가)
2. **API 키 관리 FE 완결** — BE 에 보호된 키 관리 JSON API(`GET/POST /api/keys`, `POST /api/keys/:id/revoke`) 추가, 설정 화면에서 목록·생성(원문 1회 표시)·폐기를 직접 수행 (BE /panel 안내 제거)
3. **연결·MCP 주소 origin 기반 표시** — docker 내부 주소(`http://api:33000`) 노출 제거. 브라우저 `location.hostname` + 공개 API 포트(`MESSAGE_API_PUBLIC_PORT`, compose 에서 `API_PORT` 전달)로 조합해 표시, `claude mcp add` 명령도 동일 기준으로 생성

## 검증

server 137 · web 6 테스트, typecheck·build 그린. 실기동 스모크: 대화 상세 SSR 에 말풍선(is-user/is-assistant)·본문 포함, FE 프록시로 키 생성(200·원문 1회)→폐기(200)→설정 SSR 에 '폐기됨' 반영 확인.
