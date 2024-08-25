import {
  pgTable,
  uuid,
  timestamp,
  integer,
  boolean
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { sql } from 'drizzle-orm'

// Relations
import classTable from './class.model'
import exerciseTable from './exercise.model'

const classExerciseTable = pgTable('ClassExercise', {
  ce_class_id: uuid('ce_class_id')
    .notNull()
    .references(() => classTable.class_id),

  ce_exercise_id: uuid('ce_exercise_id')
    .notNull()
    .references(() => exerciseTable.exercise_id),

  series: integer('series'),
  repetitions: integer('repetitions'),

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

const classExerciseModelSchema = createSelectSchema(classExerciseTable)
const classExerciseDtoSchema = classExerciseModelSchema
const classExerciseInputSchema = createInsertSchema(classExerciseTable)
const classExerciseUpdateSchema = classExerciseInputSchema
  .partial()
  .required({ ce_class_id: true, ce_exercise_id: true })

export type ClassExerciseModel = z.infer<typeof classExerciseModelSchema>
export type ClassExerciseDto = z.infer<typeof classExerciseDtoSchema>
export type ClassExerciseInput = z.infer<typeof classExerciseInputSchema>
export type ClassExerciseUpdate = z.infer<typeof classExerciseUpdateSchema>

export const classExerciseSchemas = {
  model: classExerciseModelSchema,
  dto: classExerciseDtoSchema,
  input: classExerciseInputSchema,
  update: classExerciseUpdateSchema,
}

export default classExerciseTable
