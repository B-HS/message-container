# containers 통합 브랜치 전략 합의 (2026-08-25)

## 결정

- 자가호스팅 Docker 패널 레포(`containers`)의 호스트에서 message-container 를 운영하기 위한 전용 브랜치 **`chore/containers`** 를 둔다.
- `compose.containers.yaml` 만 브랜치 전용이며(가이드 문서 `docs/containers-integration.md` 는 dev 에도 포함), containers 쪽에서는 이 브랜치를 pull 해 `docker compose -f compose.containers.yaml up -d --build` 로 바로 올린다.
- 갱신 흐름: `dev` 에서 개발 → `chore/containers` 로 merge → push.

## 배경·제약

- containers 패널의 compose-stack 배포는 보안 정책상 호스트 바인드 마운트를 거부(`HOST_BIND_MOUNT`)하므로, chat.db 마운트가 필수인 본 스택은 패널 Deployment 대상이 아니라 **같은 호스트의 1급 compose** 로 기동한다. 패널은 이를 일반 컨테이너로 제어·모니터링한다.
- `containers_edge` 외부 네트워크에 합류해 패널 nginx 라우팅이 가능하며, 그쪽 `api`/`web` 서비스와의 DNS alias 충돌을 피해 서비스명은 `message-api`/`message-web` 을 쓴다.
