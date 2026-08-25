# scripts/smoke-test.sh — 기동·상태 확인 스크립트

> 최종 갱신: 2026-08-25 · 기준: dev 브랜치

docker 만 있으면 스택(api + web)을 기동하고 상태를 확인한다. **패스워드 입력이 없다** — 초기 설정(패스워드·API 키)은 전부 웹(`http://localhost:32000`)에서 진행되고 서버에 기록된다. 확인은 전부 **웹 origin 경유**다(백엔드는 기본 비노출 — 단일 origin 프록시 모델).

## 사용법

```bash
./scripts/smoke-test.sh          # MySQL compose 기동 + 상태 확인
./scripts/smoke-test.sh sqlite   # SQLite 단일 컨테이너 변형
./scripts/smoke-test.sh down     # 정리 (DB 볼륨 유지 — 삭제는 docker compose down --volumes)
```

## 단계

1. `docker compose up -d --build` (mysql 또는 sqlite 변형)
2. `{WEB_URL}/api/be/auth/status` 응답 대기 (기본 90초, `BOOT_TIMEOUT_S`)
3. 상태 확인 — 초기 설정 여부(`passwordSet`), 키 없이 API 호출 401(보호 정상), `/openapi.json` 200, MCP 키 없이 401
4. `passwordSet` 값에 따라 웹에서 초기 설정 또는 로그인하라는 안내를 출력

## 환경변수

| 변수             | 기본값                   | 용도                                            |
| ---------------- | ------------------------ | ----------------------------------------------- |
| `WEB_URL`        | `http://localhost:32000` | 대상 웹 origin (API·MCP 확인도 이 주소 경유)    |
| `BOOT_TIMEOUT_S` | `90`                     | 서버 대기 한도                                  |
| `SKIP_BOOT`      | `0`                      | `1` 이면 compose 기동 생략, 실행 중 서버만 확인 |

## 검증 기록

- 2026-08-25: 패스워드 입력식(패널 setup/login·키 발급 자동화)에서 현재의 무입력 기동·상태 확인 방식으로 재작성 — 초기설정이 웹으로 이관된 데 따른 변경 (docs/acknowledge/2026-08-25-monorepo-fe.md)
