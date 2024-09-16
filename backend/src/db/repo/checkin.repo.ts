import { Service } from 'typedi'
import type {
  CheckinInput,
  CheckinModel,
  CheckinUpdate,
} from '../schema/checkin.model'
import db from '..'
import checkinTable, { checkinSchemas } from '../schema/checkin.model'
import { eq } from 'drizzle-orm'

@Service()
export default class CheckinRepo {
  async create(checkin: CheckinInput): Promise<CheckinModel> {
    const [ret] = await db
      .insert(checkinTable)
      .values(checkin)
      .returning()

    return checkinSchemas.model.parse(ret)
  }

  async update(checkin: CheckinUpdate): Promise<CheckinModel> {
    const [ret] = await db
      .update(checkinTable)
      .set(checkin)
      .where(eq(checkinTable.ci_user_id, checkin.ci_user_id))
      .returning()

    return checkinSchemas.model.parse(ret)
  }

  async delete(
    id: CheckinModel['ci_user_id']
  ): Promise<CheckinModel> {
    const [ret] = await db
      .delete(checkinTable)
      .where(eq(checkinTable.ci_user_id, id))
      .returning()

    return checkinSchemas.model.parse(ret)
  }

  async find(
    id: CheckinModel['ci_user_id']
  ): Promise<CheckinModel | undefined> {
    const [ret] = await db
      .select()
      .from(checkinTable)
      .where(eq(checkinTable.ci_user_id, id))

    return ret ? checkinSchemas.model.parse(ret) : undefined
  }

  async findMany(): Promise<CheckinModel[]> {
    return checkinSchemas.model
      .array()
      .parse(await db.query.checkinTable.findMany())
  }
}
