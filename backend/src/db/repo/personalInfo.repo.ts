import { Service } from 'typedi'
import type {
  PersonalInfoInput,
  PersonalInfoModel,
  PersonalInfoUpdate,
} from '../schema/personalInfo.model'
import db from '..'
import personalInfoTable, {
  personalInfoSchemas,
} from '../schema/personalInfo.model'
import { eq } from 'drizzle-orm'

@Service()
export default class PersonalInfoRepo {
  async create(
    personalInfo: PersonalInfoInput
  ): Promise<PersonalInfoModel> {
    const [ret] = await db
      .insert(personalInfoTable)
      .values(personalInfo)
      .returning()

    return personalInfoSchemas.model.parse(ret)
  }

  async update(
    personalInfo: PersonalInfoUpdate
  ): Promise<PersonalInfoModel> {
    const [ret] = await db
      .update(personalInfoTable)
      .set(personalInfo)
      .where(
        eq(personalInfoTable.pi_user_id, personalInfo.pi_user_id)
      )
      .returning()

    return personalInfoSchemas.model.parse(ret)
  }

  async delete(
    id: PersonalInfoModel['pi_user_id']
  ): Promise<PersonalInfoModel> {
    const [ret] = await db
      .delete(personalInfoTable)
      .where(eq(personalInfoTable.pi_user_id, id))
      .returning()

    return personalInfoSchemas.model.parse(ret)
  }

  async find(
    id: PersonalInfoModel['pi_user_id']
  ): Promise<PersonalInfoModel | undefined> {
    const [ret] = await db
      .select()
      .from(personalInfoTable)
      .where(eq(personalInfoTable.pi_user_id, id))

    return ret ? personalInfoSchemas.model.parse(ret) : undefined
  }

  async findMany(): Promise<PersonalInfoModel[]> {
    return personalInfoSchemas.model
      .array()
      .parse(await db.query.personalInfoTable.findMany())
  }
}
