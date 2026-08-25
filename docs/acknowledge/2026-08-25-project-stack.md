# 프로젝트 스택·환경 합의 (2026-08-25)

## 프로젝트 목표

macOS 의 Messages 데이터(chat.db)를 읽어 조회 API 를 제공하는 Docker 컨테이너.

- 컨테이너는 `~/Library/Messages` 를 read-only 볼륨 마운트
- 내부 동기화 워커가 설정된 주기로 live chat.db 에서 커서(ROWID) 이후 신규 행만 읽어 컨테이너 자체 DB 에 적재
- API 는 컨테이너 DB 를 조회해 서빙
- 발송(send)은 범위 외 — 조회 전용 (Linux 컨테이너에서 AppleScript 불가)

## 합의된 결정

| 항목         | 결정                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------- |
| 런타임       | Bun                                                                                           |
| 서버         | Hono (backend.md 계층 구조: Route → Service → ServiceDb → Drizzle)                            |
| ORM          | Drizzle                                                                                       |
| 컨테이너 DB  | provider 선택형 — 기본 `mysql`, 추가 `sqlite` · `postgres`                                    |
| chat.db 읽기 | 직접 read-only 열기 + 커서 기반 증분 SELECT. 실패 시 해당 틱 스킵, 다음 틱 재시도             |
| git          | init 완료, 자동 커밋(`llm-rules.auto-commit=true`), push 는 수동(`llm-rules.auto-push=false`) |
| 커밋 언어    | 신규 레포 — Conventional Commits + 한국어 description (git.md 기본값)                         |

## 기술 전제 (사용자와 공유된 제약)

- Docker 컨테이너는 Linux 이므로 macOS API·AppleScript 접근 불가 → 조회 전용
- `~/Library/Messages` 는 TCC 보호 경로 → Docker Desktop/OrbStack 에 Full Disk Access 부여 필요
- WAL 모드 chat.db 를 VirtioFS 로 읽는 것은 SQLite 가 보장하지 않음 → 실패 틱 스킵/재시도로 흡수 (커서 기반이라 유실 없음, 최악의 경우 수 초 지연)
- 파일 변경 이벤트(inotify)가 VM 경계를 넘지 않음 → 폴링 기반 동기화
- 신규 macOS 에서 message.text 가 NULL 이고 본문이 attributedBody(typedstream) 에 있는 경우가 많음 → best-effort 추출, 실패 시 null 저장 (한계로 문서화)
