import { pgEnum } from 'drizzle-orm/pg-core'
import { z } from 'zod'

const fileFormatEnum = pgEnum(
    'FileFormatEnum',
    ['mp4', 'png', 'jpg']
)

export const fileFormatEnumSchema = z.enum(fileFormatEnum.enumValues)

export type FileFormatEnum = z.infer<typeof fileFormatEnumSchema>

export default fileFormatEnum
