import { Database } from 'bun:sqlite'
import { afterAll, describe, expect, test } from 'bun:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { isAppError } from '@/lib/error'
import { createChatDbReader } from '@/service/shared/chat-db-reader'
import { buildTypedstreamBody } from '@/tests/helpers/typedstream-fixture'

const NS_PER_MS = 1_000_000
const GROUP_CHAT_STYLE = 43
const INDIVIDUAL_CHAT_STYLE = 45

const tempDir = mkdtempSync(join(tmpdir(), 'chat-db-reader-'))
const chatDbPath = join(tempDir, 'chat.db')

const setupFakeChatDb = () => {
    const db = new Database(chatDbPath, { create: true })
    db.exec(`
        CREATE TABLE message (ROWID INTEGER PRIMARY KEY, guid TEXT, text TEXT, attributedBody BLOB, handle_id INTEGER, is_from_me INTEGER, date INTEGER, service TEXT, cache_has_attachments INTEGER);
        CREATE TABLE chat (ROWID INTEGER PRIMARY KEY, guid TEXT, chat_identifier TEXT, service_name TEXT, display_name TEXT, style INTEGER);
        CREATE TABLE chat_message_join (chat_id INTEGER, message_id INTEGER);
        CREATE TABLE chat_handle_join (chat_id INTEGER, handle_id INTEGER);
        CREATE TABLE handle (ROWID INTEGER PRIMARY KEY, id TEXT, service TEXT);
        CREATE TABLE attachment (ROWID INTEGER PRIMARY KEY, guid TEXT, filename TEXT, transfer_name TEXT, mime_type TEXT, total_bytes INTEGER);
        CREATE TABLE message_attachment_join (message_id INTEGER, attachment_id INTEGER);
    `)
    db.exec(`
        INSERT INTO handle (ROWID, id, service) VALUES (1, '+821012345678', 'iMessage'), (2, 'friend@example.com', 'iMessage');
        INSERT INTO chat (ROWID, guid, chat_identifier, service_name, display_name, style)
            VALUES (10, 'chat-guid-10', '+821012345678', 'iMessage', NULL, ${INDIVIDUAL_CHAT_STYLE}),
                   (11, 'chat-guid-11', 'group-1', 'iMessage', '가족방', ${GROUP_CHAT_STYLE});
        INSERT INTO chat_handle_join (chat_id, handle_id) VALUES (10, 1), (11, 1), (11, 2);
        INSERT INTO attachment (ROWID, guid, filename, transfer_name, mime_type, total_bytes)
            VALUES (100, 'att-guid', '~/Library/Messages/Attachments/ab/photo.png', 'photo.png', 'image/png', 1234);
    `)
    const nsDateMs = 700_000_000_000
    const nsDate = BigInt(nsDateMs) * BigInt(NS_PER_MS)
    const legacySecondsDate = 600_000_000
    const insertMessage = db.prepare(
        'INSERT INTO message (ROWID, guid, text, attributedBody, handle_id, is_from_me, date, service, cache_has_attachments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    )
    insertMessage.run(1, 'msg-1', 'plain text', null, 1, 0, nsDate, 'iMessage', 0)
    insertMessage.run(2, 'msg-2', null, buildTypedstreamBody('typedstream 본문'), 2, 0, nsDate, 'iMessage', 1)
    insertMessage.run(3, 'msg-3', 'legacy date', null, 0, 1, legacySecondsDate, 'SMS', 0)
    db.exec('INSERT INTO chat_message_join (chat_id, message_id) VALUES (10, 1), (11, 2), (10, 3)')
    db.exec('INSERT INTO message_attachment_join (message_id, attachment_id) VALUES (2, 100)')
    db.close()
    return { nsDateMs, legacySecondsDate }
}

const { nsDateMs, legacySecondsDate } = setupFakeChatDb()

afterAll(() => rmSync(tempDir, { recursive: true, force: true }))

describe('chatDbReader.readBatch', () => {
    test('커서 이후 메시지와 연관 데이터를 함께 읽는다', () => {
        const reader = createChatDbReader({ chatDbPath })
        const batch = reader.readBatch(0, 100)

        expect(batch.messages.length).toBe(3)
        expect(batch.chats.map((c) => c.rowId).toSorted()).toEqual([10, 11])
        expect(batch.handles.map((h) => h.rowId).toSorted()).toEqual([1, 2])
        expect(batch.chatHandles.length).toBe(3)
        expect(batch.attachments.at(0)?.messageRowId).toBe(2)
    })

    test('나노초 date 와 레거시 초 단위 date 를 모두 ms 로 변환한다', () => {
        const batch = createChatDbReader({ chatDbPath }).readBatch(0, 100)
        expect(batch.messages.at(0)?.msSinceAppleEpoch).toBe(nsDateMs)
        expect(batch.messages.at(2)?.msSinceAppleEpoch).toBe(legacySecondsDate * 1000)
    })

    test('handle_id 0 은 null 로, style 43 은 그룹으로 매핑한다', () => {
        const batch = createChatDbReader({ chatDbPath }).readBatch(0, 100)
        expect(batch.messages.at(2)?.handleRowId).toBeNull()
        expect(batch.messages.at(2)?.isFromMe).toBe(true)
        expect(batch.chats.find((c) => c.rowId === 11)?.isGroup).toBe(true)
        expect(batch.chats.find((c) => c.rowId === 10)?.isGroup).toBe(false)
    })

    test('커서 이후만 읽고 limit 을 지킨다', () => {
        const reader = createChatDbReader({ chatDbPath })
        expect(reader.readBatch(1, 100).messages.map((m) => m.rowId)).toEqual([2, 3])
        expect(reader.readBatch(0, 1).messages.map((m) => m.rowId)).toEqual([1])
    })

    test('DB 파일이 없으면 SYNC_SOURCE_UNAVAILABLE 로 실패한다', () => {
        const reader = createChatDbReader({ chatDbPath: join(tempDir, 'missing.db') })
        try {
            reader.readBatch(0, 100)
            expect.unreachable()
        } catch (error) {
            expect(isAppError(error) && error.code === 'SYNC_SOURCE_UNAVAILABLE').toBe(true)
        }
    })
})
