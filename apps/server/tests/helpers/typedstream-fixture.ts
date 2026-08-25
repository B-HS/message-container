const STREAM_PREFIX = [0x04, 0x0b]
const STRING_HEADER = [0x01, 0x94, 0x84, 0x01, 0x2b]
const LENGTH_UINT16_TAG = 0x81

export const buildTypedstreamBody = (text: string) => {
    const encoded = new TextEncoder().encode(text)
    const marker = new TextEncoder().encode('NSString')
    const lengthBytes =
        encoded.length < LENGTH_UINT16_TAG ? [encoded.length] : [LENGTH_UINT16_TAG, encoded.length % 256, Math.floor(encoded.length / 256)]
    return Uint8Array.from([...STREAM_PREFIX, ...marker, ...STRING_HEADER, ...lengthBytes, ...encoded])
}
