# 단일 origin 노출 모델 합의 (2026-08-25)

## 배경

설정 화면의 API·MCP 주소가 "브라우저 hostname + 공개 API 포트" 조합이라, 리버스 프록시·별도 도메인 뒤에서는 표시 주소가 틀렸다. 공개 origin 을 env 로 명시하는 방안(`MESSAGE_API_PUBLIC_URL`)을 구현하던 중, 사용자가 "웹을 프록시로 쓰면 백엔드를 완벽하게 숨길 수 있지 않냐"고 제안했다.

## 결정

**웹(32000)을 유일한 노출면으로 하고 백엔드(33000)는 docker 내부 네트워크 전용으로 숨긴다.**

- 웹 프록시(`/api/be/[...path]`)가 세션 쿠키 **또는 `Authorization: Bearer` 패스스루**를 받는다 — 스크립트·curl 도 웹 origin 으로 호출
- `/mcp` 는 웹이 백엔드로 **스트리밍 프록시**(SSE 통과, `apps/web/app/mcp/route.ts`), `/openapi.json` 도 패스스루
- 프록시 무자격 통과는 `GET /api/auth/status` 하나뿐 (표면 최소화)
- compose 에서 api 서비스의 호스트 포트 매핑 제거

## 이유

- 설정 화면 주소 = `window.location.origin` 으로 끝 — 공개 origin 설정·조합 문제가 원천 소멸
- 단일 origin 이라 CORS 자체가 불필요, 노출 포트 1개로 공격 표면 최소화
- 리버스 프록시(containers nginx 등) 뒤에서도 웹 하나만 라우팅하면 API·MCP 가 함께 동작

## 기각된 대안

- **`MESSAGE_API_PUBLIC_URL`/`MESSAGE_API_PUBLIC_PORT` env 로 공개 주소 명시** — 구현 중 폐기. 설정할 값이 늘고, BE 노출·CORS 관리가 계속 따라온다. 단일 origin 이 문제를 제거하는 근본 해법
- **BE 직접 노출을 기본값으로 유지** — 개인용에서 포트 2개 노출·주소 2벌 관리는 손해. 직접 노출은 compose 에 `ports` 를 추가하는 옵트인으로 강등

## 남긴 것

- 서버의 **옵트인 CORS**(`CORS_ALLOWED_ORIGINS`, 콤마 구분) — BE 를 직접 노출하기로 선택한 경우 브라우저 클라이언트용. 기본 미설정=미허용
- 마이그레이션: 기존에 `:33000/mcp` 로 등록한 MCP 클라이언트는 `:32000/mcp` 로 재등록 필요
