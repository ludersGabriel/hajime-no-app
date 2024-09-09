import { Service } from 'typedi'
import type {
  ClassInput,
  ClassModel,
  ClassUpdate,
} from '../schema/class.model'
import db from '..'
import classTable, { classSchemas } from '../schema/class.model'
import { eq } from 'drizzle-orm'

@Service()
export default class ClassRepo {
  async create(classInput: ClassInput): Promise<ClassModel> {
    const [ret] = await db
      .insert(classTable)
      .values(classInput)
      .returning()

    return classSchemas.model.parse(ret)
  }

  async update(classUpdate: ClassUpdate): Promise<ClassModel> {
    const [ret] = await db
      .update(classTable)
      .set(classUpdate)
      .where(eq(classTable.class_id, classUpdate.class_id))
      .returning()

    return ret
  }

  async delete(id: ClassModel['class_id']): Promise<ClassModel> {
    const [ret] = await db
      .delete(classTable)
      .where(eq(classTable.class_id, id))
      .returning()

    return classSchemas.model.parse(ret)
  }

  async find(
    id: ClassModel['class_id']
  ): Promise<ClassModel | undefined> {
    const [ret] = await db
      .select()
      .from(classTable)
      .where(eq(classTable.class_id, id))

    return ret ? classSchemas.model.parse(ret) : undefined
  }

  async findMany(): Promise<ClassModel[]> {
    return classSchemas.model
      .array()
      .parse(await db.query.classTable.findMany())
  }
}
