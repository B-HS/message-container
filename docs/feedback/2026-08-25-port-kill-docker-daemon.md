# 포트 기준 kill -9 가 Docker 데몬을 죽인 사고

## 무엇을 지적받았나

Docker 데몬이 두 차례 내려감 ("docker 에 뭔짓을 했길래 daemon 이 내려가 있는 거야", "또 도커 꺼졌잖아").

## 왜 틀렸나 (근본 원인)

로컬 스모크 테스트 전에 포트를 비우려고 `lsof -ti :32000 -ti :33000 | xargs kill -9` 를 실행했다. 그러나 그 시점에 해당 호스트 포트를 점유한 프로세스는 내가 띄운 dev 서버가 아니라 **실행 중인 compose 스택을 포워딩하던 Docker Desktop 백엔드(`com.docker.backend`)** 였다. 포트 점유자를 확인하지 않은 무차별 SIGKILL 이 데몬 자체를 죽였다. 로그 근거: `com.docker.backend.log` 의 `monitor exited: signal: killed`, virtualization watchdog 의 `parent process disappeared`.

## 어떻게 고치나

- 포트 번호로 프로세스를 죽이지 않는다. 내가 시작한 프로세스는 **시작 시 PID 를 캡처해 그 PID 만** 종료한다 (`SERVER_PID=$!` → `kill $SERVER_PID`).
- 포트 정리가 불가피하면 kill 전에 `lsof -i :PORT` 로 **소유 프로세스명을 확인**하고, `com.docker.*`·시스템 프로세스면 절대 죽이지 않는다.
- 스모크 테스트는 compose 스택과 겹치지 않는 별도 포트를 사용한다 (예: 34xxx 대역).

## 언제 적용하나

이 레포에 한정되지 않는다 — 로컬에서 dev 서버·컨테이너를 병행하는 모든 작업에서, 포트 충돌을 이유로 프로세스를 종료하려 할 때 항상.
