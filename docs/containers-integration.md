# containers 스택 통합 가이드 (chore/containers 브랜치)

[containers](https://github.com/B-HS) 자가호스팅 Docker 패널과 **같은 호스트**에서 message-container 를 운영하기 위한 변형. 이 브랜치(`chore/containers`)에만 존재하는 `compose.containers.yaml` 을 사용한다.

## 왜 패널 Deployment 가 아니라 별도 compose 인가

containers 패널의 compose-stack 배포는 보안 정책상 **호스트 바인드 마운트를 거부**한다(`packages/contracts/src/deployment-stack.ts` 의 `HOST_BIND_MOUNT` 규칙). message-container 는 `~/Library/Messages`(chat.db) 읽기 전용 마운트가 필수이므로 패널 배포 대상이 될 수 없다. 대신 같은 Docker 호스트에서 이 compose 로 직접 기동하면 패널이 일반 컨테이너로서 제어·로그·트래픽 모니터링을 제공하고, `containers_edge` 네트워크 합류로 패널 nginx 라우팅도 가능하다.

## 설계

| 항목     | 값                                                                                            | 이유                                                                            |
| -------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 서비스명 | `message-api` · `message-web`                                                                 | containers 스택의 `api`/`web` 과 `containers_edge` 위 DNS alias 충돌 방지       |
| DB       | SQLite (`message-data` named volume)                                                          | 패널 관리 하에서 이동부 최소화 (mysql 불필요)                                   |
| 네트워크 | 자체 `internal` + 외부 `containers_edge`                                                      | 패널 nginx 가 `message-web:32000` / `message-api:33000` 으로 upstream 지정 가능 |
| 포트     | 기본 `127.0.0.1:33000`(api) · `127.0.0.1:32000`(web)                                          | 루프백 한정. `MC_API_BIND=0.0.0.0` 등으로 개방 가능                             |
| 하드닝   | `cap_drop: ALL` · `no-new-privileges` · pids/메모리 제한 · 로그 로테이션 · non-root(USER bun) | containers 스택 컨벤션과 동급                                                   |
| 헬스체크 | bun 내장 fetch (`/api/auth/status`, `/setup`)                                                 | 이미지에 wget/curl 없음                                                         |

## 절차

```bash
git clone -b chore/containers https://github.com/B-HS/message-container.git
cd message-container

# 전제 1: Docker Desktop/OrbStack 에 Full Disk Access (docs/setup.md 1장)
# 전제 2: containers 스택이 먼저 기동되어 있어야 함 (containers_edge 네트워크 생성 주체)

docker compose -f compose.containers.yaml up -d --build
open http://localhost:32000   # 초기 패스워드 설정 → 대시보드
```

- 패널에서는 `message-container-message-api-1` / `message-container-message-web-1` 컨테이너로 보이며 로그·제어·트래픽이 그대로 잡힌다.
- 패널 nginx 로 도메인을 붙이려면 GUI 에서 upstream 을 `message-web:32000`(웹) / `message-api:33000`(API·MCP) 으로 라우트를 추가한다.
- MCP 는 `http://<호스트>:33000/mcp` (또는 nginx 라우트 도메인) + 설정 화면에서 발급한 `msg_` 키.

## 브랜치 운영

- `dev`(기능 개발) → 이 브랜치로 갱신 반영: `git checkout chore/containers && git merge dev && git push`
- containers 쪽에서는 항상 `chore/containers` 를 pull 해서 `docker compose -f compose.containers.yaml up -d --build` 만 다시 실행하면 된다.

## 검증 기록 (2026-08-25)

- `docker compose -f compose.containers.yaml config -q` 통과
- 임시 `containers_edge` 네트워크 + 대체 포트(34110/34210)로 실기동: 양 서비스 healthy, 초기설정→대시보드 정상, 종료 후 네트워크 정리
