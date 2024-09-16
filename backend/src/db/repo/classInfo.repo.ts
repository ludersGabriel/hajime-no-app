import { Service } from 'typedi'
import classInfoTable, {
  classInfoSchemas,
  type ClassInfoInput,
  type ClassInfoModel,
  type ClassInfoUpdate,
} from '../schema/classInfo.model'
import db from '..'
import { eq } from 'drizzle-orm'

@Service()
export default class ClassInfoRepo {
  async create(classInfo: ClassInfoInput): Promise<ClassInfoModel> {
    const [ret] = await db
      .insert(classInfoTable)
      .values(classInfo)
      .returning()

    return classInfoSchemas.model.parse(ret)
  }

  async update(classInfo: ClassInfoUpdate): Promise<ClassInfoModel> {
    const [ret] = await db
      .update(classInfoTable)
      .set(classInfo)
      .where(eq(classInfoTable.ci_class_id, classInfo.ci_class_id))
      .returning()

    return classInfoSchemas.model.parse(ret)
  }

  async delete(
    id: ClassInfoModel['ci_class_id']
  ): Promise<ClassInfoModel> {
    const [ret] = await db
      .delete(classInfoTable)
      .where(eq(classInfoTable.ci_class_id, id))
      .returning()

    return classInfoSchemas.model.parse(ret)
  }

  async find(
    id: ClassInfoModel['ci_class_id']
  ): Promise<ClassInfoModel | undefined> {
    const [ret] = await db
      .select()
      .from(classInfoTable)
      .where(eq(classInfoTable.ci_class_id, id))

    return ret ? classInfoSchemas.model.parse(ret) : undefined
  }

  async findMany(): Promise<ClassInfoModel[]> {
    return classInfoSchemas.model
      .array()
      .parse(await db.query.classInfoTable.findMany())
  }
}
