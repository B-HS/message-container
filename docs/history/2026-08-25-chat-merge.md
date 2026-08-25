# 2026-08-25 — 대화 병합 (대표 1행)

## 사용자 보고

대화 목록에 하위 대화(같은 상대의 SMS/iMessage 별 chat 행)가 전부 떠서 중복으로 보임.

## 원인과 수정

chat.db 는 같은 상대라도 서비스(SMS/iMessage)별로 chat 행을 따로 가진다. 목록이 chat 행 단위라 같은 대화가 여러 행으로 노출됐다.

- **병합 규칙**: `chat_identifier`(없으면 guid) 기준으로 행을 묶어 대표 1건만 노출. 대표 = 최신 메시지를 가진 행, `messageCount` 는 합산, `serviceNames` 는 union, 참여자는 주소 기준 dedup. 병합은 도메인 로직이므로 `chat-service` 에 위치 (provider 는 행 단위 통계만 제공)
- **상세도 병합**: `ChatSummary.chatIds` 로 그룹 전체 chat id 를 노출하고, 메시지 조회를 `chat_source_row_id IN (chatIds)` 로 변경 — 어느 멤버 id 로 접근해도 같은 병합 대화가 열리고 SMS·iMessage 메시지가 한 타임라인에 섞여 나온다. 상세 헤더에 서비스 배지(iMessage·SMS) 표시
- API 변화: `serviceName` → `serviceNames: string[]`, `chatIds: number[]` 추가 (MCP get_chat_messages 도 병합 반영)

## 검증

server 138 · web 6 그린. 병합 시나리오 fake chat.db(같은 번호의 SMS/iMessage 행 + 타인 행)로 실기동: 목록 "대화 2개", 멤버 id 접근 시 양 서비스 메시지 병합 렌더 확인.
