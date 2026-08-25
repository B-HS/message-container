#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-mysql}"
BASE_URL="${BASE_URL:-http://localhost:33000}"
BOOT_TIMEOUT_S="${BOOT_TIMEOUT_S:-60}"
KEY_NAME="smoke-$(date +%s)"

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
    echo "  환경변수: PANEL_PASSWORD(패널 패스워드), BASE_URL(기본 http://localhost:33000), SKIP_BOOT=1(compose 생략)"
    exit 1
fi

if [ -z "${PANEL_PASSWORD:-}" ]; then
    read -r -s -p "패널 패스워드 (최소 8자, 미설정 상태면 이 값으로 초기 설정됩니다): " PANEL_PASSWORD
    echo
fi

if [ "${#PANEL_PASSWORD}" -lt 8 ]; then
    echo "패스워드는 최소 8자여야 합니다"
    exit 1
fi

if [ "${SKIP_BOOT:-0}" != "1" ]; then
    echo "[1/6] 컨테이너 기동: $(compose_file)"
    docker compose -f "$(compose_file)" up -d --build
else
    echo "[1/6] SKIP_BOOT=1 — 기동 생략, $BASE_URL 의 실행 중 서버를 사용"
fi

echo "[2/6] 서버 대기: $BASE_URL"
for _ in $(seq 1 "$BOOT_TIMEOUT_S"); do
    if curl -sf "$BASE_URL/panel" >/dev/null 2>&1; then break; fi
    sleep 1
done
curl -sf "$BASE_URL/panel" >/dev/null 2>&1 || {
    echo "서버가 응답하지 않습니다. docker compose logs api 를 확인하세요"
    exit 1
}

echo "[3/6] 패스워드 설정 또는 로그인"
HEADERS_FILE="$(mktemp)"
trap 'rm -f "$HEADERS_FILE"' EXIT
curl -s -o /dev/null -D "$HEADERS_FILE" -X POST "$BASE_URL/panel/setup" \
    --data-urlencode "password=$PANEL_PASSWORD" --data-urlencode "confirm=$PANEL_PASSWORD"
COOKIE="$(grep -i '^set-cookie: panel_session=' "$HEADERS_FILE" | sed 's/^[Ss]et-[Cc]ookie: //' | cut -d';' -f1 | tr -d '\r' || true)"
if [ -z "$COOKIE" ]; then
    curl -s -o /dev/null -D "$HEADERS_FILE" -X POST "$BASE_URL/panel/login" --data-urlencode "password=$PANEL_PASSWORD"
    COOKIE="$(grep -i '^set-cookie: panel_session=' "$HEADERS_FILE" | sed 's/^[Ss]et-[Cc]ookie: //' | cut -d';' -f1 | tr -d '\r' || true)"
fi
if [ -z "$COOKIE" ]; then
    echo "로그인 실패 — 이미 설정된 패널 패스워드와 PANEL_PASSWORD 가 다릅니다"
    exit 1
fi

echo "[4/6] API 키 발급: $KEY_NAME"
API_KEY="$(curl -s -X POST "$BASE_URL/panel/keys" -H "Cookie: $COOKIE" --data-urlencode "name=$KEY_NAME" | grep -o 'msg_[A-Za-z0-9_-]*' | head -1 || true)"
if [ -z "$API_KEY" ]; then
    echo "키 발급 실패"
    exit 1
fi

echo "[5/6] API 검증"
UNAUTH_STATUS="$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/sync/status")"
echo "  - 키 없이 호출: HTTP $UNAUTH_STATUS (기대 401)"
SYNC_STATUS="$(curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/api/sync/status")"
echo "  - sync 상태: $SYNC_STATUS"
if printf '%s' "$SYNC_STATUS" | grep -q '"lastError":"'; then
    echo "  ! chat.db 를 읽지 못했습니다 — Docker Desktop/OrbStack 에 Full Disk Access 를 부여하고 재시작하세요 (docs/setup.md 1장)"
fi
echo "  - 대화 목록: $(curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/api/chats?limit=3" | head -c 300)"
echo "  - 최근 메시지: $(curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/api/messages?limit=3" | head -c 300)"

echo "[6/6] MCP 검증"
TOOLS="$(
    curl -s -X POST "$BASE_URL/mcp" -H "Authorization: Bearer $API_KEY" \
        -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' \
        -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' |
        grep -o '"name":"[a-z_]*"' | sed 's/"name"://; s/"//g' | paste -sd ' ' - || true
)"
echo "  - 도구: ${TOOLS:-응답 없음}"

echo
echo "완료. 발급된 API 키 (지금만 표시되니 안전한 곳에 보관):"
echo "  $API_KEY"
echo
echo "Claude Code 에 MCP 로 연결하려면:"
echo "  claude mcp add --transport http message-container $BASE_URL/mcp --header \"Authorization: Bearer $API_KEY\""
