#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-mysql}"
WEB_URL="${WEB_URL:-http://localhost:32000}"
BOOT_TIMEOUT_S="${BOOT_TIMEOUT_S:-90}"

compose_file() {
    if [ "$MODE" = "sqlite" ]; then echo "docker-compose.sqlite.yml"; else echo "docker-compose.yml"; fi
}

if [ "$MODE" = "down" ]; then
    docker compose -f docker-compose.yml down --remove-orphans 2>/dev/null || true
    docker compose -f docker-compose.sqlite.yml down --remove-orphans 2>/dev/null || true
    echo "컨테이너 정리 완료 (DB 볼륨은 유지 — 삭제하려면 docker compose down --volumes)"
    exit 0
fi

if [ "$MODE" != "mysql" ] && [ "$MODE" != "sqlite" ]; then
    echo "사용법: scripts/smoke-test.sh [mysql|sqlite|down]"
    echo "  환경변수: WEB_URL(기본 http://localhost:32000), SKIP_BOOT=1(compose 생략)"
    exit 1
fi

if [ "${SKIP_BOOT:-0}" != "1" ]; then
    echo "[1/3] 컨테이너 기동: $(compose_file)"
    docker compose -f "$(compose_file)" up -d --build
else
    echo "[1/3] SKIP_BOOT=1 — 기동 생략, $WEB_URL 의 실행 중 서버를 사용"
fi

echo "[2/3] 웹 대기: $WEB_URL (백엔드는 비노출 — 웹이 유일한 진입점)"
for _ in $(seq 1 "$BOOT_TIMEOUT_S"); do
    if curl -sf "$WEB_URL/api/be/auth/status" >/dev/null 2>&1; then break; fi
    sleep 1
done
curl -sf "$WEB_URL/api/be/auth/status" >/dev/null 2>&1 || {
    echo "웹이 응답하지 않습니다. docker compose logs web api 를 확인하세요"
    exit 1
}

echo "[3/3] 상태 확인"
AUTH_STATUS="$(curl -s "$WEB_URL/api/be/auth/status")"
echo "  - 초기 설정 상태: $AUTH_STATUS"
UNAUTH_STATUS="$(curl -s -o /dev/null -w '%{http_code}' "$WEB_URL/api/be/sync/status")"
echo "  - 키·세션 없이 API 호출: HTTP $UNAUTH_STATUS (기대 401 — 보호 정상)"
OPENAPI_STATUS="$(curl -s -o /dev/null -w '%{http_code}' "$WEB_URL/openapi.json")"
echo "  - OpenAPI 스펙: HTTP $OPENAPI_STATUS (기대 200)"
MCP_STATUS="$(curl -s -o /dev/null -w '%{http_code}' -X POST "$WEB_URL/mcp" -H 'Content-Type: application/json' -d '{}')"
echo "  - MCP (키 없이): HTTP $MCP_STATUS (기대 401 — 보호 정상)"

echo
if printf '%s' "$AUTH_STATUS" | grep -q '"passwordSet":false'; then
    echo "기동 완료. 초기 설정은 웹에서 진행하세요: $WEB_URL (패스워드 설정 → 자동 로그인)"
else
    echo "기동 완료. 웹에서 로그인하세요: $WEB_URL"
fi
echo "API·MCP 는 같은 origin 을 사용합니다: $WEB_URL/api/be/...  ·  $WEB_URL/mcp"
