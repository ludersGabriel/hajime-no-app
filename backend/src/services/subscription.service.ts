import type { AuthSchema } from '@/db/repo/auth.repo'
import SubscriptionRepo from '@/db/repo/subscription.repo'
import {
  type SubscriptionFind,
  type SubscriptionInput,
  type SubscriptionModel,
  type SubscriptionUpdate,
} from '@/db/schema/subscription.model'
import { Inject, Service } from 'typedi'

// ! Check if only admins can do this or people can get it too
@Service()
export default class SubscriptionService {
  @Inject()
  private readonly repo: SubscriptionRepo

  async create(
    context: AuthSchema,
    subscription: SubscriptionInput
  ): Promise<SubscriptionModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.create(subscription)
  }

  async update(
    context: AuthSchema,
    subscription: SubscriptionUpdate
  ): Promise<SubscriptionModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.update(subscription)
  }

  async delete(
    context: AuthSchema,
    input: SubscriptionFind
  ): Promise<SubscriptionModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(input.s_user_id, input.s_class_id)
  }

  async find(
    context: AuthSchema,
    input: SubscriptionFind
  ): Promise<SubscriptionModel | undefined> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.find(input.s_user_id, input.s_class_id)
  }

  async findMany(context: AuthSchema): Promise<SubscriptionModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
