# 2026-08-25 — 대화 목록 로직 수정 · 저장소 정리

## 사용자 보고

검색의 최근 메시지는 정상인데 "대화 화면은 대화가 아닌 느낌" — 점검 결과 실제 결함 2건 + 저장소 오염 1건.

## 원인과 수정

1. **대화 목록 정렬 결함** — chat ROWID(대화 행 생성 순) 내림차순으로 정렬되고 있었음. 최근 메시지 시각(`max(sent_at_ms)`) 내림차순으로 변경하고, 마지막 메시지 미리보기·시각·메시지 수를 `ChatSummary` 에 추가 (3개 provider 공통, pg 는 `nulls last`)
2. **drizzle 상관 서브쿼리 렌더링 함정** — SELECT 필드 안에서 `${chats.sourceRowId}` 가 비정규화(`"source_row_id"`)로 렌더링되어 서브쿼리의 `m.source_row_id` 로 자기참조됨 → 상관 컬럼을 리터럴 `chats.source_row_id` 로 명시해 해결 (toSQL 로 확인)
3. **`.next` 빌드 산출물 커밋 제거** — 루트 .gitignore 에 `.next/`·`out/` 누락으로 웹 빌드 청크(js)가 커밋되어 있었음 (사용자가 GitHub 에서 본 대량 .js 의 정체). `git rm --cached` 로 제거·ignore 보강. 소스는 전수 확인 결과 126개 전부 TypeScript(strict)

## 검증

- 단위/통합: server 134 · web 6 그린. sqlite provider 테스트에 정렬·미리보기 단언 추가
- 재현 검증: "오래된 chat 행 + 최신 메시지" 시나리오에서 수정 전 [11,10] → 수정 후 [10,11]
- 실 DB: mysql:8 · postgres:18 컨테이너에서 lastMessageText·lastMessageAt·messageCount 정상 응답 확인
