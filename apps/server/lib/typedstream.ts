const NSSTRING_MARKER = new TextEncoder().encode('NSString')
const STRING_START_BYTE = 0x2b
const STRING_START_SEARCH_WINDOW = 8
const LENGTH_UINT16_TAG = 0x81
const LENGTH_UINT32_TAG = 0x82
const ATTACHMENT_PLACEHOLDER = '\uFFFC'

const findSequence = (buffer: Uint8Array, sequence: Uint8Array, fromIndex: number) => {
    for (let i = fromIndex; i <= buffer.length - sequence.length; i += 1) {
        let matched = true
        for (let j = 0; j < sequence.length; j += 1) {
            if (buffer[i + j] !== sequence[j]) {
                matched = false
                break
            }
        }
        if (matched) return i
    }
    return -1
}

const readLength = (buffer: Uint8Array, offset: number) => {
    const tag = buffer[offset]
    if (tag === undefined) return null
    if (tag === LENGTH_UINT16_TAG) {
        const low = buffer[offset + 1]
        const high = buffer[offset + 2]
        if (low === undefined || high === undefined) return null
        return { length: low + high * 256, dataOffset: offset + 3 }
    }
    if (tag === LENGTH_UINT32_TAG) {
        let length = 0
        for (let i = 3; i >= 0; i -= 1) {
            const byte = buffer[offset + 1 + i]
            if (byte === undefined) return null
            length = length * 256 + byte
        }
        return { length, dataOffset: offset + 5 }
    }
    return { length: tag, dataOffset: offset + 1 }
}

/**
 * Best-effort extraction of the message text from an NSAttributedString typedstream blob (chat.db attributedBody).
 * Returns null when the blob cannot be parsed.
 */
export const extractTypedstreamText = (buffer: Uint8Array | null) => {
    if (!buffer || buffer.length === 0) return null
    const markerIndex = findSequence(buffer, NSSTRING_MARKER, 0)
    if (markerIndex === -1) return null
    const searchFrom = markerIndex + NSSTRING_MARKER.length
    let startByteIndex = -1
    for (let i = searchFrom; i < Math.min(searchFrom + STRING_START_SEARCH_WINDOW, buffer.length); i += 1) {
        if (buffer[i] === STRING_START_BYTE) {
            startByteIndex = i
            break
        }
    }
    if (startByteIndex === -1) return null
    const parsed = readLength(buffer, startByteIndex + 1)
    if (!parsed || parsed.length === 0 || parsed.dataOffset + parsed.length > buffer.length) return null
    try {
        const text = new TextDecoder('utf-8', { fatal: true }).decode(buffer.slice(parsed.dataOffset, parsed.dataOffset + parsed.length))
        const cleaned = text.replaceAll(ATTACHMENT_PLACEHOLDER, '').trim()
        return cleaned.length > 0 ? cleaned : null
    } catch {
        return null
    }
}
