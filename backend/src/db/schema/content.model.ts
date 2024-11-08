import {
  pgTable,
  uuid,
  timestamp,
  varchar,
  boolean,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'

const contentTable = pgTable('Content', {
  content_id: uuid('content_id').primaryKey().defaultRandom(),

  name: varchar('name', { length: 100 }),

  storage_path: varchar('storage_path', { length: 100 }),

  created_at: timestamp('created_at', {
    mode: 'string',
  })
    .notNull()
    .defaultNow(),

  updated_at: timestamp('updated_at', {
    mode: 'string',
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`current_timestamp`),

  active: boolean('active').notNull().default(true),
})

const contentModelSchema = createSelectSchema(contentTable)
const contentDtoSchema = contentModelSchema
const contentInputSchema = createInsertSchema(contentTable)
// .extend({
//   file: z.instanceof(Stream)
// })

const contentUpdateSchema = contentInputSchema
  .partial()
  .required({ content_id: true })

export type ContentModel = z.infer<typeof contentModelSchema>
export type ContentDto = z.infer<typeof contentDtoSchema>
export type ContentInput = z.infer<typeof contentInputSchema>
export type ContentUpdate = z.infer<typeof contentUpdateSchema>

export const contentSchemas = {
  model: contentModelSchema,
  dto: contentDtoSchema,
  input: contentInputSchema,
  update: contentUpdateSchema,
}

export default contentTable
