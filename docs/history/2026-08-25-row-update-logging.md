# 행 갱신 감지(재스캔) + 로깅 시스템 (2026-08-25)

합의: [acknowledge/2026-08-25-row-update-logging.md](../acknowledge/2026-08-25-row-update-logging.md)

## 한 일

1. **스키마 확장 (마이그레이션 0002, 3 dialect)** — `messages` 에 `is_read`·`date_read_ms`·`associated_message_guid`·`associated_message_type`, 신규 `logs` 테이블(id·level·event·message·details_json·created_at_ms + created 인덱스)
2. **행 갱신 감지** — `chat-db-reader` 가 `is_read`·`date_read`(ns/s 판별, 0 → null)·`associated_message_*` 를 함께 SELECT. `sync-service.runOnce()` 가 신규분 루프 후 `RESCAN_WINDOW_ROWS`(500) 윈도를 매 틱 재읽기해 upsert(커서 무전진). `associated_message_type` 0 → null 정규화. provider 3종의 messages upsert set·조회 selection 확장
3. **조회 API** — `MessageSummary` 에 `isRead`·`readAt`(ISO)·`associatedMessageGuid`·`associatedMessageType` 추가 (MCP 는 동일 Service 재사용이라 자동 반영)
4. **로깅 시스템** — `LogService`(record: details JSON 직렬화 + 보존 상한 1만건 정리 + 실패 삼킴 / list: 페이지네이션 + level 필터), `/api/logs` 라우트. 기록 지점: `SyncService.runOnce`(synced>0 → sync.batch), `index.ts` 워커(실패 천이 sync.error·복구 sync.recovered), `AuthService` 내부(setup·login 성공/실패/잠금·키 발급/폐기), `route/index.ts` 관측 미들웨어(500 → api.unhandled)
5. **FE** — 사이드바 "로그" 메뉴 + `/logs` 페이지(SSR prefetch·level 필터·DataTable), 말풍선에 tapback 배지(추가-제거 상쇄 집계, guid prefix `p:0/`·`bp:` 파싱)와 마지막 발신 메시지 "읽음" 마커, `messageSummarySchema` 확장
6. **운영 정리** — docker-compose.yml 의 MySQL 3306 호스트 포트 매핑 제거(단일 origin 완성), FE 쿠키명 `mc_api_key` → `msg_api_key`(사용자 교정 — 기존 로그인 브라우저는 재로그인 필요), README 스크린샷을 데모 인스턴스(신기능 포함)로 재촬영

## 검증

- `tsc --noEmit`·`prettier --check` 통과, 서버 152 pass(재스캔 5건·log-service 4건·e2e 3건 신규 포함) · 웹 6 pass, 웹 `next build` 성공
- 실기동: sqlite(로컬 34110)·mysql(`mysql:8` 34306)·postgres(`postgres:18` 34432) 3 provider 에서 "기존 행 text 수정·읽음 처리 재동기화 + tapback 동기화 + /api/logs" 확인 — [quality-assurance/provider-verification.md](../quality-assurance/provider-verification.md)
- 데모 인스턴스(34150/34151)에서 브라우저로 초기 설정 → 대화 상세의 tapback 배지·읽음 마커·로그 메뉴 렌더 확인 후 스크린샷 교체

## 함정 기록

- 브라우저 쿠키는 호스트 단위(포트 무시)라, localhost:32000 실 스택의 API 키 쿠키가 데모(34151)의 `/setup` 리다이렉트를 오염시킨다 — 데모 검증 시 `/api/session` DELETE 로 쿠키를 지우고 시작할 것
- fake chat.db 시딩 시 `message.date` 는 Apple epoch(2001-01-01) 기준 ns 다 — Unix ms 를 그대로 ns 로 바꾸면 +31년으로 표시된다
