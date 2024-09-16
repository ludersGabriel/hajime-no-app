import type { AuthSchema } from '@/db/repo/auth.repo'
import PersonalInfoRepo from '@/db/repo/personalInfo.repo'
import type {
  PersonalInfoInput,
  PersonalInfoModel,
  PersonalInfoUpdate,
} from '@/db/schema/personalInfo.model'
import { Inject, Service } from 'typedi'

@Service()
export default class PersonalInfoService {
  @Inject()
  private readonly repo: PersonalInfoRepo

  async create(
    context: AuthSchema,
    personalInfo: PersonalInfoInput
  ): Promise<PersonalInfoModel> {
    if (
      context.role !== 'admin' &&
      context.l_user_id !== personalInfo.pi_user_id
    ) {
      throw new Error('Unauthorized')
    }

    return this.repo.create(personalInfo)
  }

  async update(
    context: AuthSchema,
    personalInfo: PersonalInfoUpdate
  ): Promise<PersonalInfoModel> {
    if (
      context.role !== 'admin' &&
      context.l_user_id !== personalInfo.pi_user_id
    ) {
      throw new Error('Unauthorized')
    }

    return this.repo.update(personalInfo)
  }

  async delete(
    context: AuthSchema,
    id: PersonalInfoModel['pi_user_id']
  ): Promise<PersonalInfoModel> {
    if (context.role !== 'admin' && context.l_user_id !== id) {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(id)
  }

  async find(
    context: AuthSchema,
    id: PersonalInfoModel['pi_user_id']
  ): Promise<PersonalInfoModel | undefined> {
    if (context.role !== 'admin' && context.l_user_id !== id) {
      throw new Error('Unauthorized')
    }

    return this.repo.find(id)
  }

  async findMany(context: AuthSchema): Promise<PersonalInfoModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
