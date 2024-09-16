import { Service } from 'typedi'
import type {
  ClassExerciseInput,
  ClassExerciseModel,
  ClassExerciseUpdate,
} from '../schema/classExercise.model'
import db from '..'
import classExerciseTable, {
  classExerciseSchemas,
} from '../schema/classExercise.model'
import { and, eq } from 'drizzle-orm'

@Service()
export default class ClassExerciseRepo {
  async create(
    classExercise: ClassExerciseInput
  ): Promise<ClassExerciseModel> {
    const [ret] = await db
      .insert(classExerciseTable)
      .values(classExercise)
      .returning()

    return classExerciseSchemas.model.parse(ret)
  }

  async update(
    classExercise: ClassExerciseUpdate
  ): Promise<ClassExerciseModel> {
    const [ret] = await db
      .update(classExerciseTable)
      .set(classExercise)
      .where(
        and(
          eq(
            classExerciseTable.ce_class_id,
            classExercise.ce_class_id
          ),
          eq(
            classExerciseTable.ce_exercise_id,
            classExercise.ce_exercise_id
          )
        )
      )
      .returning()

    return classExerciseSchemas.model.parse(ret)
  }

  async delete(
    class_id: ClassExerciseModel['ce_class_id'],
    exercise_id: ClassExerciseModel['ce_exercise_id']
  ): Promise<ClassExerciseModel> {
    const [ret] = await db
      .delete(classExerciseTable)
      .where(
        and(
          eq(classExerciseTable.ce_class_id, class_id),
          eq(classExerciseTable.ce_exercise_id, exercise_id)
        )
      )
      .returning()

    return classExerciseSchemas.model.parse(ret)
  }

  async find(
    class_id: ClassExerciseModel['ce_class_id'],
    exercise_id: ClassExerciseModel['ce_exercise_id']
  ): Promise<ClassExerciseModel | undefined> {
    const [ret] = await db
      .select()
      .from(classExerciseTable)
      .where(
        and(
          eq(classExerciseTable.ce_class_id, class_id),
          eq(classExerciseTable.ce_exercise_id, exercise_id)
        )
      )

    return ret ? classExerciseSchemas.model.parse(ret) : undefined
  }

  async findMany(): Promise<ClassExerciseModel[]> {
    return classExerciseSchemas.model
      .array()
      .parse(await db.query.classExerciseTable.findMany())
  }
}
