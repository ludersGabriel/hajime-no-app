import {
  pgTable,
  uuid,
  timestamp,
  boolean
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'

// Relations
import exerciseCategoryTable from './exerciseCategory.model'

const exerciseTable = pgTable('Exercise', {
  exercise_id: uuid('exercise_id').primaryKey(),

  e_category_id: uuid('e_category_id')
    .notNull()
    .references(() => exerciseCategoryTable.category_id),

  // ADD CONTENT LATER

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

  active: boolean('active')
    .notNull()
    .default(true)
})

const exerciseModelSchema = createSelectSchema(exerciseTable)
const exerciseDtoSchema = exerciseModelSchema
const exerciseInputSchema = createInsertSchema(exerciseTable)
const exerciseUpdateSchema = exerciseInputSchema
  .partial()
  .required({ exercise_id: true })

export type ExerciseModel = z.infer<typeof exerciseModelSchema>
export type ExerciseDto = z.infer<typeof exerciseDtoSchema>
export type ExerciseInput = z.infer<typeof exerciseInputSchema>
export type ExerciseUpdate = z.infer<typeof exerciseUpdateSchema>

export const exerciseSchemas = {
  model: exerciseModelSchema,
  dto: exerciseDtoSchema,
  input: exerciseInputSchema,
  update: exerciseUpdateSchema,
}

export default exerciseTable
