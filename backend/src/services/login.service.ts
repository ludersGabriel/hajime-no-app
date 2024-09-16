import LoginRepo from '@/db/repo/login.repo'
import type {
  LoginInput,
  LoginModel,
  LoginUpdate,
} from '@/db/schema/login.model'
import { Inject, Service } from 'typedi'

@Service()
export default class LoginService {
  @Inject()
  private readonly repo: LoginRepo

  async create(login: LoginInput): Promise<LoginModel> {
    return this.repo.create(login)
  }

  async update(login: LoginUpdate): Promise<LoginModel> {
    return this.repo.update(login)
  }

  async delete(
    username: LoginModel['username']
  ): Promise<LoginModel> {
    return this.repo.delete(username)
  }

  async find(
    username: LoginModel['username']
  ): Promise<LoginModel | undefined> {
    return this.repo.find(username)
  }
}
