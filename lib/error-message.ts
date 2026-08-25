import type { ErrorCode } from '@/lib/error-code'

export const ERROR_MESSAGE: Record<ErrorCode, string> = {
    VALIDATION_ERROR: '요청 값이 올바르지 않습니다',
    CHAT_NOT_FOUND: '대화를 찾을 수 없습니다',
    ATTACHMENT_NOT_FOUND: '첨부파일을 찾을 수 없습니다',
    ATTACHMENT_FILE_NOT_FOUND: '첨부파일 원본이 존재하지 않습니다',
    ATTACHMENT_PATH_INVALID: '첨부파일 경로가 유효하지 않습니다',
    SYNC_SOURCE_UNAVAILABLE: 'chat.db 를 읽을 수 없습니다',
    INTERNAL_ERROR: '서버 내부 오류가 발생했습니다',
}
