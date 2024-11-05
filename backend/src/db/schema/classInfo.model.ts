import {
  pgTable,
  uuid,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'

import classTable from './class.model'

const classInfoTable = pgTable('Class', {
  ci_class_id: uuid('ci_class_id')
    .primaryKey()
    .references(() => classTable.class_id),

  title: varchar('title', { length: 100 }),
  description: varchar('description', { length: 500 }),

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
})

const classInfoModelSchema = createSelectSchema(classInfoTable)
const classInfoDtoSchema = classInfoModelSchema
const classInfoInputSchema = createInsertSchema(classInfoTable)
const classInfoUpdateSchema = classInfoInputSchema
  .partial()
  .required({ ci_class_id: true })

export type ClassInfoModel = z.infer<typeof classInfoModelSchema>
export type ClassInfoDto = z.infer<typeof classInfoDtoSchema>
export type ClassInfoInput = z.infer<typeof classInfoInputSchema>
export type ClassInfoUpdate = z.infer<typeof classInfoUpdateSchema>

export const classInfoSchemas = {
  model: classInfoModelSchema,
  dto: classInfoDtoSchema,
  input: classInfoInputSchema,
  update: classInfoUpdateSchema,
}

export default classInfoTable
