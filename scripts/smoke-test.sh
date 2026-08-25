#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-mysql}"
BASE_URL="${BASE_URL:-http://localhost:33000}"
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
    echo "  환경변수: BASE_URL(기본 http://localhost:33000), WEB_URL(기본 http://localhost:32000), SKIP_BOOT=1(compose 생략)"
    exit 1
fi

if [ "${SKIP_BOOT:-0}" != "1" ]; then
    echo "[1/3] 컨테이너 기동: $(compose_file)"
    docker compose -f "$(compose_file)" up -d --build
else
    echo "[1/3] SKIP_BOOT=1 — 기동 생략, $BASE_URL 의 실행 중 서버를 사용"
fi

echo "[2/3] 서버 대기: $BASE_URL"
for _ in $(seq 1 "$BOOT_TIMEOUT_S"); do
    if curl -sf "$BASE_URL/api/auth/status" >/dev/null 2>&1; then break; fi
    sleep 1
done
curl -sf "$BASE_URL/api/auth/status" >/dev/null 2>&1 || {
    echo "서버가 응답하지 않습니다. docker compose logs api 를 확인하세요"
    exit 1
}

echo "[3/3] 상태 확인"
AUTH_STATUS="$(curl -s "$BASE_URL/api/auth/status")"
echo "  - 초기 설정 상태: $AUTH_STATUS"
UNAUTH_STATUS="$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/sync/status")"
echo "  - 키 없이 API 호출: HTTP $UNAUTH_STATUS (기대 401 — 보호 정상)"
OPENAPI_STATUS="$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/openapi.json")"
echo "  - OpenAPI 스펙: HTTP $OPENAPI_STATUS (기대 200)"
MCP_STATUS="$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE_URL/mcp" -H 'Content-Type: application/json' -d '{}')"
echo "  - MCP (키 없이): HTTP $MCP_STATUS (기대 401 — 보호 정상)"

echo
if printf '%s' "$AUTH_STATUS" | grep -q '"passwordSet":false'; then
    echo "기동 완료. 초기 설정은 웹에서 진행하세요: $WEB_URL (패스워드 설정 → 자동 로그인)"
else
    echo "기동 완료. 웹에서 로그인하세요: $WEB_URL"
fi
echo "API 키 관리(폐기 등)는 $BASE_URL/panel 에서도 가능합니다."