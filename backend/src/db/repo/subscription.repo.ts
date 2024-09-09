import { Service } from 'typedi'
import type {
  SubscriptionInput,
  SubscriptionModel,
  SubscriptionUpdate,
} from '../schema/subscription.model'
import db from '..'
import subscriptionTable, {
  subscriptionSchemas,
} from '../schema/subscription.model'
import { and, eq } from 'drizzle-orm'

@Service()
export default class SubscriptionRepo {
  async create(
    subscription: SubscriptionInput
  ): Promise<SubscriptionModel> {
    const [ret] = await db
      .insert(subscriptionTable)
      .values(subscription)
      .returning()

    return subscriptionSchemas.model.parse(ret)
  }

  async update(
    subscription: SubscriptionUpdate
  ): Promise<SubscriptionModel> {
    const [ret] = await db
      .update(subscriptionTable)
      .set(subscription)
      .where(
        and(
          eq(subscriptionTable.s_user_id, subscription.s_user_id),
          eq(subscriptionTable.s_class_id, subscription.s_class_id)
        )
      )
      .returning()

    return subscriptionSchemas.model.parse(ret)
  }

  async delete(
    userId: SubscriptionModel['s_user_id'],
    classId: SubscriptionModel['s_class_id']
  ): Promise<SubscriptionModel> {
    const [ret] = await db
      .delete(subscriptionTable)
      .where(
        and(
          eq(subscriptionTable.s_user_id, userId),
          eq(subscriptionTable.s_class_id, classId)
        )
      )
      .returning()

    return subscriptionSchemas.model.parse(ret)
  }

  async find(
    userId: SubscriptionModel['s_user_id'],
    classId: SubscriptionModel['s_class_id']
  ): Promise<SubscriptionModel | undefined> {
    const [ret] = await db
      .select()
      .from(subscriptionTable)
      .where(
        and(
          eq(subscriptionTable.s_user_id, userId),
          eq(subscriptionTable.s_class_id, classId)
        )
      )

    return ret ? subscriptionSchemas.model.parse(ret) : undefined
  }

  async findMany(): Promise<SubscriptionModel[]> {
    return subscriptionSchemas.model
      .array()
      .parse(await db.query.subscriptionTable.findMany())
  }
}
