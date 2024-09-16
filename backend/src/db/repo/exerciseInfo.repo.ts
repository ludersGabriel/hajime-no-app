import { Service } from 'typedi'
import type {
  ExerciseInfoInput,
  ExerciseInfoModel,
  ExerciseInfoUpdate,
} from '../schema/exerciseInfo.model'
import db from '..'
import exerciseInfoTable, {
  exerciseInfoSchemas,
} from '../schema/exerciseInfo.model'
import { eq } from 'drizzle-orm'

@Service()
export default class ExerciseInfoRepo {
  async create(
    exerciseInfo: ExerciseInfoInput
  ): Promise<ExerciseInfoModel> {
    const [ret] = await db
      .insert(exerciseInfoTable)
      .values(exerciseInfo)
      .returning()

    return exerciseInfoSchemas.model.parse(ret)
  }

  async update(
    exerciseInfo: ExerciseInfoUpdate
  ): Promise<ExerciseInfoModel> {
    const [ret] = await db
      .update(exerciseInfoTable)
      .set(exerciseInfo)
      .where(
        eq(
          exerciseInfoTable.ei_exercise_id,
          exerciseInfo.ei_exercise_id
        )
      )
      .returning()

    return exerciseInfoSchemas.model.parse(ret)
  }

  async delete(
    id: ExerciseInfoModel['ei_exercise_id']
  ): Promise<ExerciseInfoModel> {
    const [ret] = await db
      .delete(exerciseInfoTable)
      .where(eq(exerciseInfoTable.ei_exercise_id, id))
      .returning()

    return exerciseInfoSchemas.model.parse(ret)
  }

  async find(
    id: ExerciseInfoModel['ei_exercise_id']
  ): Promise<ExerciseInfoModel | undefined> {
    const [ret] = await db
      .select()
      .from(exerciseInfoTable)
      .where(eq(exerciseInfoTable.ei_exercise_id, id))

    return ret ? exerciseInfoSchemas.model.parse(ret) : undefined
  }

  async findMany(): Promise<ExerciseInfoModel[]> {
    return exerciseInfoSchemas.model
      .array()
      .parse(await db.query.exerciseInfoTable.findMany())
  }
}
