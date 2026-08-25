import type { z } from 'zod'

export const parseJson = async <T extends z.ZodTypeAny>(res: Response, schema: T) => schema.parse(await res.json())
