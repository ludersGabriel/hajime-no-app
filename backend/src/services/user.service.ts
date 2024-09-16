import type { AuthSchema } from '@/db/repo/auth.repo'
import { UserRepo } from '@/db/repo/user.repo'
import {
  type UserInput,
  type UserModel,
  type UserUpdate,
} from '@/db/schema/user.model'
import { Inject, Service } from 'typedi'

@Service()
export class UserService {
  @Inject()
  private readonly repo: UserRepo

  //! Need to check about admin checks here and how to handle
  //! user creation and what not
  async create(
    context: AuthSchema,
    user: UserInput
  ): Promise<UserModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.create(user)
  }

  async update(
    context: AuthSchema,
    user: UserUpdate
  ): Promise<UserModel> {
    if (
      context.role !== 'admin' &&
      context.l_user_id !== user.user_id
    ) {
      throw new Error('Unauthorized')
    }

    return this.repo.update(user)
  }

  async delete(
    context: AuthSchema,
    user_id: UserModel['user_id']
  ): Promise<UserModel> {
    if (context.role !== 'admin' && context.l_user_id !== user_id) {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(user_id)
  }

  async find(
    context: AuthSchema,
    user_id: UserModel['user_id']
  ): Promise<UserModel> {
    if (context.role !== 'admin' && context.l_user_id !== user_id) {
      throw new Error('Unauthorized')
    }

    return this.repo.find(user_id)
  }

  async findMany(context: AuthSchema): Promise<UserModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
