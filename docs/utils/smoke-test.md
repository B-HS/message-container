# scripts/smoke-test.sh — 기동·검증 스크립트

컨테이너 기동부터 패널 패스워드 설정/로그인, API 키 발급, 보호 API·MCP 호출 검증까지 한 번에 수행한다.

## 사용법

```bash
PANEL_PASSWORD='원하는패스워드' ./scripts/smoke-test.sh          # MySQL compose 로 기동 + 검증
PANEL_PASSWORD='원하는패스워드' ./scripts/smoke-test.sh sqlite   # SQLite 단일 컨테이너로 기동 + 검증
./scripts/smoke-test.sh down                                     # 컨테이너 정리 (DB 볼륨 유지)
```

- `PANEL_PASSWORD` 를 생략하면 프롬프트로 입력받는다 (최소 8자).
- 패스워드가 미설정 상태면 이 값으로 초기 설정하고, 이미 설정돼 있으면 이 값으로 로그인한다. 다르면 종료 코드 1.

## 단계

1. `docker compose up -d --build` (mysql 또는 sqlite 변형)
2. `/panel` 응답 대기 (기본 60초, `BOOT_TIMEOUT_S`)
3. `/panel/setup` 시도 → 이미 설정이면 `/panel/login` — 세션 쿠키 획득
4. `/panel/keys` 로 API 키(`msg_`) 발급 — 키는 마지막에 1회 출력
5. API 검증: 키 없이 401, `/api/sync/status`(lastError 있으면 Full Disk Access 안내), `/api/chats`, `/api/messages`
6. MCP 검증: `/mcp` `tools/list` 로 도구 6종 확인 후, Claude Code 연결 명령(`claude mcp add`) 출력

## 환경변수

| 변수             | 기본값                   | 용도                                                 |
| ---------------- | ------------------------ | ---------------------------------------------------- |
| `PANEL_PASSWORD` | (프롬프트)               | 패널 패스워드                                        |
| `BASE_URL`       | `http://localhost:33000` | 대상 서버                                            |
| `BOOT_TIMEOUT_S` | `60`                     | 서버 대기 한도                                       |
| `SKIP_BOOT`      | `0`                      | `1` 이면 compose 기동을 생략하고 실행 중 서버만 검증 |

## 검증 기록

- 2026-08-25: fake chat.db 로컬 서버 대상 초기 설정·재로그인·오류 패스워드 3개 경로 확인, `docker compose config` 유효성 확인.
