import { Service } from 'typedi'
import type {
  ExerciseInput,
  ExerciseModel,
  ExerciseUpdate,
} from '../schema/exercise.model'
import db from '..'
import exerciseTable, {
  exerciseSchemas,
} from '../schema/exercise.model'
import { eq } from 'drizzle-orm'

@Service()
export default class ExerciseRepo {
  async create(exercise: ExerciseInput): Promise<ExerciseModel> {
    const [ret] = await db
      .insert(exerciseTable)
      .values(exercise)
      .returning()

    return exerciseSchemas.model.parse(ret)
  }

  async update(exercise: ExerciseUpdate): Promise<ExerciseModel> {
    const [ret] = await db
      .update(exerciseTable)
      .set(exercise)
      .where(eq(exerciseTable.exercise_id, exercise.exercise_id))
      .returning()

    return exerciseSchemas.model.parse(ret)
  }

  async delete(
    id: ExerciseModel['exercise_id']
  ): Promise<ExerciseModel> {
    const [ret] = await db
      .delete(exerciseTable)
      .where(eq(exerciseTable.exercise_id, id))
      .returning()

    return exerciseSchemas.model.parse(ret)
  }

  async find(
    id: ExerciseModel['exercise_id']
  ): Promise<ExerciseModel | undefined> {
    const [ret] = await db
      .select()
      .from(exerciseTable)
      .where(eq(exerciseTable.exercise_id, id))

    return ret ? exerciseSchemas.model.parse(ret) : undefined
  }

  async findMany(): Promise<ExerciseModel[]> {
    return exerciseSchemas.model
      .array()
      .parse(await db.query.exerciseTable.findMany())
  }
}
