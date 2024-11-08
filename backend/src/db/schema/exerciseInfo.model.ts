import {
  pgTable,
  uuid,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'

const exerciseInfoTable = pgTable('ExerciseInfo', {
  ei_exercise_id: uuid('ei_exercise_id').primaryKey(),

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

const exerciseInfoModelSchema = createSelectSchema(exerciseInfoTable)
const exerciseInfoDtoSchema = exerciseInfoModelSchema
const exerciseInfoInputSchema = createInsertSchema(exerciseInfoTable)
const exerciseInfoUpdateSchema = exerciseInfoInputSchema
  .partial()
  .required({ ei_exercise_id: true })

export type ExerciseInfoModel = z.infer<
  typeof exerciseInfoModelSchema
>
export type ExerciseInfoDto = z.infer<typeof exerciseInfoDtoSchema>
export type ExerciseInfoInput = z.infer<
  typeof exerciseInfoInputSchema
>
export type ExerciseInfoUpdate = z.infer<
  typeof exerciseInfoUpdateSchema
>

export const exerciseInfoSchemas = {
  model: exerciseInfoModelSchema,
  dto: exerciseInfoDtoSchema,
  input: exerciseInfoInputSchema,
  update: exerciseInfoUpdateSchema,
}

export default exerciseInfoTable
