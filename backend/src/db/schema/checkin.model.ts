import {
  pgTable,
  uuid,
  timestamp,
  time
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

// Relations
import userTable from './user.model'

const checkinTable = pgTable('Checkin', {
  ci_user_id: uuid('ci_user_id')
    .notNull()
    .references(() => userTable.user_id),

  class_time: time('class_time')
    .notNull(),

  created_at: timestamp('created_at', {
    mode: 'string',
  })
    .notNull()
    .defaultNow(),
})

const checkinModelSchema = createSelectSchema(checkinTable)
const checkinDtoSchema = checkinModelSchema
const checkinInputSchema = createInsertSchema(checkinTable)
const checkinUpdateSchema = checkinInputSchema
  .partial()
  .required({ ci_user_id: true })

export type CheckinModel = z.infer<typeof checkinModelSchema>
export type CheckinDto = z.infer<typeof checkinDtoSchema>
export type CheckinInput = z.infer<typeof checkinInputSchema>
export type CheckinUpdate = z.infer<typeof checkinUpdateSchema>

export const checkinSchemas = {
  model: checkinModelSchema,
  dto: checkinDtoSchema,
  input: checkinInputSchema,
  update: checkinUpdateSchema,
}

export default checkinTable
