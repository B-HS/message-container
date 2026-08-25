import { queryOptions, useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { attachmentMetaSchema } from '@entities/attachment/attachment.type'
import { QUERY_KEY } from '@shared/constants/query-key'
import { successEnvelopeSchema } from '@shared/lib/envelope'
import { apiFetch } from '@shared/lib/fetch'

export const attachmentsByMessagesQueryOptions = (messageIds: number[]) =>
    queryOptions({
        queryKey: QUERY_KEY.ATTACHMENT.BY_MESSAGES(messageIds),
        queryFn: async () => {
            const body = successEnvelopeSchema(z.object({ attachments: z.array(attachmentMetaSchema) })).parse(
                await apiFetch(`/attachments?messageIds=${messageIds.join(',')}`),
            )
            return body.data.attachments
        },
    })

export const useGetAttachmentsByMessages = (messageIds: number[]) =>
    useQuery({ ...attachmentsByMessagesQueryOptions(messageIds), enabled: messageIds.length > 0 })

export const attachmentFileUrl = (attachmentId: number) => `/api/be/attachments/${attachmentId}/file`
