# 아키텍처

macOS Messages(`chat.db`)를 읽어 조회 API 로 제공하는 백엔드의 계층 구조·데이터 흐름·설계 근거.
스택 합의는 [docs/acknowledge/2026-08-25-project-stack.md](./acknowledge/2026-08-25-project-stack.md), 실행 절차는 [docs/setup.md](./setup.md), 테스트 구성은 [docs/testing.md](./testing.md) 참고.

## 1. 계층 구조

backend.md 의 계층형 구조를 따른다: `Route → Service → ServiceDb(compose 구현) → Drizzle`.

| 계층      | 위치                                    | 책임                                                                                                                                                                                    |
| --------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Route     | `route/*.ts`                            | DTO 검증(`validator` + Zod), `withErrorHandling` 으로 감싼 핸들러, 응답 봉투 직렬화. HTTP 이외의 것을 모른다                                                                            |
| Service   | `service/domain/message/*.ts`           | 도메인 로직. HTTP·Drizzle 을 모르며, `*ServiceDb` 인터페이스에만 의존한다. "없음"은 `null` 반환으로 표현하고, 그걸 에러로 바꾸는 것은 Route 의 몫이다                                   |
| ServiceDb | `compose/provider/{sqlite,mysql,pg}.ts` | Service 가 정의한 `*ServiceDb` 인터페이스(`SyncServiceDb`·`ChatServiceDb`·`MessageServiceDb`·`AttachmentServiceDb`)를 provider 별 Drizzle 쿼리로 구현한다. Drizzle 은 여기서만 등장한다 |
| DB        | `db/schema.{sqlite,mysql,pg}.ts`        | 컨테이너 자체 DB 스키마(3 dialect 각각 정의)                                                                                                                                            |

Route 는 `compose()` 가 반환한 Service 인스턴스만 주입받는다(`route/index.ts` → `createRouter(composed)`). Service 는 자신의 `*ServiceDb` 타입을 직접 선언하고, provider 구현이 그 계약을 채우는 구조라 Service 코드는 provider 를 몰라도 된다.

## 2. 데이터 흐름

```
chat.db(macOS, read-only) → chatDbReader.readBatch() → syncService.runOnce() → normalizeBatch() → serviceDb.sync.saveBatch() → 컨테이너 DB
컨테이너 DB → serviceDb.{chat,message,attachment}.* → *Service → Route → 조회 API 응답
```

1. **읽기**: `service/shared/chat-db-reader.ts` 가 live `chat.db` 를 `bun:sqlite` 로 `readonly: true` 열어, `message.ROWID > afterRowId` 조건으로 커서 이후 배치를 SELECT 한다. 연관된 `chat`·`handle`·`chat_message_join`·`chat_handle_join`·`attachment`·`message_attachment_join` 도 같은 배치에서 함께 읽어 Zod 스키마(`rawMessageSchema` 등)로 파싱한다. 날짜(`m.date`)는 나노초/초 단위 판별 SQL을 거쳐 ms 로 변환된다.
2. **정규화**: `sync-service.ts` 의 `normalizeBatch()` 가 원시 row 를 저장용 타입(`SyncMessageRow` 등)으로 바꾼다. `text` 가 비어 있으면 `attributedBody` 를 `extractTypedstreamText()` 로 best-effort 추출하고, Apple epoch(`msSinceAppleEpoch`)를 `appleEpochMsToUtcMs()` 로 Unix ms 로 변환한다.
3. **적재**: `serviceDb.sync.saveBatch(batch, cursor)` 가 provider 트랜잭션 안에서 `handles → chats → chatHandles → messages → attachments` 순으로 upsert(`onConflictDoUpdate`/`onConflictDoNothing`)하고, 마지막에 커서(`sync_state.cursor`)를 같은 트랜잭션으로 갱신한다. 대량 배치는 `chunk()` 로 `INSERT_CHUNK_SIZE`(500)씩 나눠 삽입한다.
4. **조회**: `chatService`/`messageService`/`attachmentService` 가 같은 컨테이너 DB 를 읽어 API 응답을 만든다. 메시지 조회는 `handles` 를 LEFT JOIN 해 발신자 주소(`senderAddress`)를 함께 반환한다.

## 3. 디렉토리 맵

| 경로                         | 내용                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.ts`                   | 부트스트랩 — `getEnv()` → `createDbClient` → `runMigrations` → `compose()` → `createRouter()` → sync 워커(`setInterval`) 시작                     |
| `route/`                     | HTTP 엔드포인트 팩토리(`createChatRoute` 등) + `route/index.ts` 의 `createRouter` 조립                                                            |
| `service/domain/message/`    | 도메인 서비스 — `chat-service.ts`·`message-service.ts`·`attachment-service.ts`·`sync-service.ts`                                                  |
| `service/shared/`            | 도메인에 속하지 않는 공유 서비스 — `chat-db-reader.ts`(원본 chat.db 읽기)                                                                         |
| `dto/`                       | Zod 스키마 — `common.ts`(페이지네이션·id 파라미터), `message.ts`(검색 쿼리)                                                                       |
| `compose/`                   | 의존성 조립 — `index.ts`(compose 루트), `provider/{sqlite,mysql,pg}.ts`(ServiceDb 구현), `provider/constants.ts`(상태 키·청크 크기)               |
| `db/`                        | `index.ts`(provider 별 Drizzle 클라이언트 생성 + 마이그레이션 실행), `schema.{sqlite,mysql,pg}.ts`(3 dialect 스키마)                              |
| `lib/`                       | 횡단 유틸 — `env.ts`·`error*.ts`·`api-response.ts`·`with-error-handling.ts`·`validation-hook.ts`·`apple-time.ts`·`typedstream.ts`·`collection.ts` |
| `drizzle/{sqlite,mysql,pg}/` | provider 별 마이그레이션 산출물                                                                                                                   |
| `tests/`                     | `lib/`·`dto/`·`service/`·`compose/`(단위·통합) + `e2e/`(전체 배선·실 프로세스 부트) — 상세는 [docs/testing.md](./testing.md)                      |

## 4. Provider 선택 구조

`DB_PROVIDER`(`mysql`(기본) · `sqlite` · `postgres`, `lib/env.ts` 의 `envSchema`)에 따라 컨테이너 자체 DB 구현이 갈린다.

- `db/index.ts` 의 `createDbClient(env)` 가 provider 별 Drizzle 인스턴스(`drizzle-orm/bun-sqlite` · `drizzle-orm/mysql2` · `drizzle-orm/bun-sql`)와 마이그레이션 폴더(`drizzle/{sqlite,mysql,pg}`)를 고른다. `sqlite` 이외는 `DATABASE_URL` 이 필수이며, 없으면 `envSchema` 의 `superRefine` 에서 검증 에러로 막는다.
- `compose/index.ts` 의 `createServiceDb(client)` 가 `client.provider` 값으로 `createSqliteServiceDb` / `createMysqlServiceDb` / `createPgServiceDb` 중 하나를 골라 `*ServiceDb` 세트(`sync`·`chat`·`message`·`attachment`)를 만든다.
- 세 provider 구현은 같은 `*ServiceDb` 인터페이스를 채우므로, Service·Route 코드는 provider 분기를 전혀 갖지 않는다.
- provider 별 실 연동 검증 상태는 [docs/quality-assurance/provider-verification.md](./quality-assurance/provider-verification.md) 참고 — sqlite 는 자동 테스트로 상시 검증되고, mysql·postgres 는 실 DB 기동이 필요해 별도 확인 대상이다.

## 5. 에러 체계

backend.md §6 의 3-파일 중앙화를 그대로 따른다.

- `lib/error-code.ts` — `ERROR_CODE` 상수(`VALIDATION_ERROR`·`CHAT_NOT_FOUND`·`ATTACHMENT_NOT_FOUND`·`ATTACHMENT_FILE_NOT_FOUND`·`ATTACHMENT_PATH_INVALID`·`SYNC_SOURCE_UNAVAILABLE`·`INTERNAL_ERROR`) + `ErrorCode` union
- `lib/error-message.ts` — 코드별 한국어 메시지(`ERROR_MESSAGE`)
- `lib/error.ts` — `STATUS_MAP`(코드 → HTTP 상태), `createAppError(code, details?)`, `isAppError()`

Route 는 `null` 을 받으면 `throw createAppError('CHAT_NOT_FOUND')` 식으로 도메인 부재를 HTTP 에러로 바꾼다. 모든 핸들러는 `lib/with-error-handling.ts` 의 `withErrorHandling()` 으로 감싸져 있어, `isAppError` 인 에러는 해당 `statusCode` 로, 그 외 처리되지 않은 예외는 `console.error('[unhandled]', ...)` 로 로깅 후 `INTERNAL_ERROR`(500) 로 변환된다. 요청 검증 실패는 `lib/validation-hook.ts` 의 `validationHook` 이 Zod 결과를 받아 `VALIDATION_ERROR`(400) 봉투로 직접 응답한다. 응답 `details` 는 `lib/api-response.ts` 의 `errorResponse()` 가 `NODE_ENV !== 'production'` 일 때만 포함시킨다.

## 6. 동기화 커서·재시도 설계

`sync-service.ts` 의 `runOnce()` 는 `serviceDb.sync.getCursor()` 로 마지막 커서(message ROWID)를 읽고, `chatDbReader.readBatch(cursor, batchSize)` 로 그 이후 행만 가져와 `saveBatch()` 로 적재한 뒤 커서를 배치의 마지막 `rowId` 로 갱신한다. 배치가 `batchSize` 미만이면(더 읽을 게 없으면) 루프를 끝낸다. `index.ts` 는 이 `runOnce()` 를 `SYNC_INTERVAL_MS` 주기 `setInterval` 로 반복 호출하며, `isSyncRunning` 플래그로 이전 틱이 끝나기 전 중복 실행을 막는다.

이 설계는 아래 두 제약에서 나왔다(합의 근거는 [docs/acknowledge/2026-08-25-project-stack.md](./acknowledge/2026-08-25-project-stack.md) 참고).

- **WAL 모드 chat.db 를 VirtioFS 로 읽는 것은 SQLite 가 보장하지 않는다** — Docker 의 macOS 파일 공유(VirtioFS)는 WAL 파일(`-wal`)의 mmap·잠금 시맨틱을 완전히 보장하지 않아, 특정 틱에서 읽기가 실패하거나 최신 커밋 이전 상태를 볼 수 있다. `chatDbReader.readBatch()` 는 실패 시 `SYNC_SOURCE_UNAVAILABLE` 을 throw 하고, `index.ts` 의 `runSyncTick()` 은 이를 잡아 `syncService.recordError()` 로 `lastError` 만 기록한 뒤 다음 틱을 그대로 진행한다.
- **파일 변경 이벤트(inotify)가 VM 경계를 넘지 않는다** — 호스트(macOS)의 파일 변경을 컨테이너(Linux)가 이벤트로 받을 수 없어, push 기반 동기화 대신 폴링(`SYNC_INTERVAL_MS`) 기반으로 설계했다.

커서가 "처리 완료 지점"만 전진시키고 실패 시 전진시키지 않으므로, 읽기 실패는 유실이 아니라 다음 틱까지의 지연으로만 나타난다. 실패 사유는 `/api/sync/status` 의 `lastError` 로 노출된다.

## 7. typedstream 추출의 한계

신규 macOS 버전은 메시지 본문을 `message.text` 대신 `message.attributedBody`(NSAttributedString 을 담은 typedstream 바이너리)에만 저장하는 경우가 많다. 전용 typedstream 파서(Apple 비공개 포맷) 없이, `lib/typedstream.ts` 의 `extractTypedstreamText()` 는 버퍼에서 `NSString` 마커를 찾고 그 직후 길이-프리픽스 문자열을 best-effort 로 디코딩하는 방식만 쓴다.

- 마커·길이 태그(`0x81`/`0x82`)를 못 찾거나 UTF-8 디코딩이 실패하면 `null` 을 반환한다 — 예외를 던지지 않고 조용히 실패한다.
- 첨부파일 placeholder 문자(`￼`)는 제거하지만, 서식(굵게·링크 등) 메타데이터나 다중 run 으로 나뉜 문자열, tapback·리액션 메시지의 구조화된 내용은 복원하지 않는다.
- 추출 실패 시 `sync-service.ts` 의 `normalizeBatch()` 는 해당 메시지의 `text` 를 `null` 로 저장한다. 클라이언트는 `text: null` 을 "본문 없음"이 아니라 "추출 실패 가능성 있음"으로 해석해야 한다.
- 실 chat.db 기준 추출률 검증은 아직 수행되지 않았다 — [docs/quality-assurance/provider-verification.md](./quality-assurance/provider-verification.md) 의 attributedBody 추출률 항목 참고.
