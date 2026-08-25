import type { ErrorCode } from '@/lib/error-code'

export const ERROR_MESSAGE: Record<ErrorCode, string> = {
    UNAUTHORIZED: '유효한 API 키가 필요합니다',
    AUTH_ALREADY_SETUP: '이미 초기 설정이 완료되었습니다',
    AUTH_INVALID_PASSWORD: '패스워드가 올바르지 않습니다',
    AUTH_LOCKED: '로그인 시도가 너무 많습니다. 잠시 후 다시 시도하세요',
    VALIDATION_ERROR: '요청 값이 올바르지 않습니다',
    CHAT_NOT_FOUND: '대화를 찾을 수 없습니다',
    ATTACHMENT_NOT_FOUND: '첨부파일을 찾을 수 없습니다',
    ATTACHMENT_FILE_NOT_FOUND: '첨부파일 원본이 존재하지 않습니다',
    ATTACHMENT_PATH_INVALID: '첨부파일 경로가 유효하지 않습니다',
    SYNC_SOURCE_UNAVAILABLE: 'chat.db 를 읽을 수 없습니다',
    INTERNAL_ERROR: '서버 내부 오류가 발생했습니다',
}
