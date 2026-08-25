import type { PaginationQuery } from '@/dto/common'

export type ChatParticipant = {
    address: string
    service: string | null
}

export type ChatRowStats = {
    sourceRowId: number
    guid: string
    identifier: string | null
    serviceName: string | null
    displayName: string | null
    isGroup: boolean
    messageCount: number
    lastMessageText: string | null
    lastMessageAtMs: number | null
}

export type ChatSummary = {
    sourceRowId: number
    guid: string
    identifier: string | null
    serviceNames: string[]
    displayName: string | null
    isGroup: boolean
    chatIds: number[]
    participants: ChatParticipant[]
    messageCount: number
    lastMessageText: string | null
    lastMessageAt: string | null
}

export type ChatServiceDb = {
    getAllChatRows: () => Promise<ChatRowStats[]>
    getParticipants: (chatIds: number[]) => Promise<{ chatSourceRowId: number; address: string; service: string | null }[]>
}

type ChatServiceDeps = {
    db: ChatServiceDb
}

const groupKeyOf = (row: ChatRowStats) => row.identifier ?? row.guid

const mergeGroups = (rows: ChatRowStats[]) => {
    const groups = new Map<string, ChatRowStats[]>()
    for (const row of rows) {
        const key = groupKeyOf(row)
        groups.set(key, [...(groups.get(key) ?? []), row])
    }
    return [...groups.values()]
        .map((members) => {
            const representative = members.toSorted((a, b) => (b.lastMessageAtMs ?? 0) - (a.lastMessageAtMs ?? 0) || b.sourceRowId - a.sourceRowId)[0]
            if (!representative) return null
            return {
                representative,
                members,
                lastMessageAtMs: representative.lastMessageAtMs,
                messageCount: members.reduce((sum, member) => sum + member.messageCount, 0),
            }
        })
        .filter((group) => group !== null)
        .toSorted((a, b) => (b.lastMessageAtMs ?? 0) - (a.lastMessageAtMs ?? 0) || b.representative.sourceRowId - a.representative.sourceRowId)
}

type MergedGroup = ReturnType<typeof mergeGroups>[number]

const toChatSummary = (group: MergedGroup, participants: Awaited<ReturnType<ChatServiceDb['getParticipants']>>): ChatSummary => {
    const memberIds = group.members.map((member) => member.sourceRowId)
    const seenAddresses = new Set<string>()
    const mergedParticipants = participants
        .filter((participant) => memberIds.includes(participant.chatSourceRowId))
        .filter((participant) => (seenAddresses.has(participant.address) ? false : (seenAddresses.add(participant.address), true)))
        .map(({ address, service }) => ({ address, service }))

    return {
        sourceRowId: group.representative.sourceRowId,
        guid: group.representative.guid,
        identifier: group.representative.identifier,
        serviceNames: [...new Set(group.members.flatMap((member) => (member.serviceName ? [member.serviceName] : [])))],
        displayName: group.members.map((member) => member.displayName).find((name) => name !== null) ?? null,
        isGroup: group.representative.isGroup,
        chatIds: memberIds,
        participants: mergedParticipants,
        messageCount: group.messageCount,
        lastMessageText: group.representative.lastMessageText,
        lastMessageAt: group.lastMessageAtMs === null ? null : new Date(group.lastMessageAtMs).toISOString(),
    }
}

export const createChatService = (deps: ChatServiceDeps) => ({
    list: async (query: PaginationQuery) => {
        const groups = mergeGroups(await deps.db.getAllChatRows())
        const pageGroups = groups.slice((query.page - 1) * query.limit, query.page * query.limit)
        const participants = await deps.db.getParticipants(pageGroups.flatMap((group) => group.members.map((member) => member.sourceRowId)))
        return { data: pageGroups.map((group) => toChatSummary(group, participants)), page: query.page, limit: query.limit, total: groups.length }
    },
    getById: async (id: number) => {
        const groups = mergeGroups(await deps.db.getAllChatRows())
        const group = groups.find((candidate) => candidate.members.some((member) => member.sourceRowId === id))
        if (!group) return null
        const participants = await deps.db.getParticipants(group.members.map((member) => member.sourceRowId))
        return toChatSummary(group, participants)
    },
})

export type ChatService = ReturnType<typeof createChatService>
