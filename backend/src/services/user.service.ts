import type db from '@/db'
import { hashPassword } from '@/db/repo/auth.repo'
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

  async findMany(): Promise<UserModel[]> {
    return await this.repo.findMany()
  }

  async findByUsername(
    username: UserModel['username']
  ): Promise<UserModel | null> {
    return await this.repo.findByUsername(username)
  }

  async create(user: UserInput, tx?: db): Promise<UserModel> {
    user.password = hashPassword(user.password)

    return this.repo.create(user, tx)
  }

  async update(user: UserUpdate): Promise<UserModel> {
    return this.repo.update(user)
  }

  async createMany(
    users: UserInput[],
    tx?: db
  ): Promise<UserModel[]> {
    for (const user of users) {
      user.password = hashPassword(user.password)
    }

    return this.repo.createMany(users, tx)
  }

  async uploadUsers(users: UserInput[]): Promise<UserModel[]> {
    for (const user of users) {
      user.password = hashPassword(user.password)
    }

    return this.repo.uploadUsers(users)
  }
}
