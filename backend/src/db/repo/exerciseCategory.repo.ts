import { Service } from 'typedi'
import type {
  ExerciseCategoryInput,
  ExerciseCategoryModel,
  ExerciseCategoryUpdate,
} from '../schema/exerciseCategory.model'
import db from '..'
import exerciseCategoryTable, {
  exerciseCategorySchemas,
} from '../schema/exerciseCategory.model'
import { eq } from 'drizzle-orm'

@Service()
export default class ExerciseCategoryRepo {
  async create(
    exerciseCategory: ExerciseCategoryInput
  ): Promise<ExerciseCategoryModel> {
    const [ret] = await db
      .insert(exerciseCategoryTable)
      .values(exerciseCategory)
      .returning()

    return exerciseCategorySchemas.model.parse(ret)
  }

  async update(
    exerciseCategory: ExerciseCategoryUpdate
  ): Promise<ExerciseCategoryModel> {
    const [ret] = await db
      .update(exerciseCategoryTable)
      .set(exerciseCategory)
      .where(
        eq(
          exerciseCategoryTable.category_id,
          exerciseCategory.category_id
        )
      )
      .returning()

    return exerciseCategorySchemas.model.parse(ret)
  }

  async delete(
    id: ExerciseCategoryModel['category_id']
  ): Promise<ExerciseCategoryModel> {
    const [ret] = await db
      .delete(exerciseCategoryTable)
      .where(eq(exerciseCategoryTable.category_id, id))
      .returning()

    return exerciseCategorySchemas.model.parse(ret)
  }

  async find(
    id: ExerciseCategoryModel['category_id']
  ): Promise<ExerciseCategoryModel | undefined> {
    const [ret] = await db
      .select()
      .from(exerciseCategoryTable)
      .where(eq(exerciseCategoryTable.category_id, id))

    return ret ? exerciseCategorySchemas.model.parse(ret) : undefined
  }

  async findMany(): Promise<ExerciseCategoryModel[]> {
    return exerciseCategorySchemas.model
      .array()
      .parse(await db.query.exerciseCategoryTable.findMany())
  }
}
