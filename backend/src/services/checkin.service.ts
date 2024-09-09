import type { AuthSchema } from '@/db/repo/auth.repo'
import CheckinRepo from '@/db/repo/checkin.repo'
import type {
  CheckinInput,
  CheckinModel,
  CheckinUpdate,
} from '@/db/schema/checkin.model'
import { Inject, Service } from 'typedi'

@Service()
export default class CheckinService {
  @Inject()
  private readonly repo: CheckinRepo

  async create(
    context: AuthSchema,
    checkin: CheckinInput
  ): Promise<CheckinModel> {
    if (
      context.role !== 'admin' &&
      context.l_user_id !== checkin.ci_user_id
    ) {
      throw new Error('Unauthorized')
    }

    return this.repo.create(checkin)
  }

  async update(
    context: AuthSchema,
    checkin: CheckinUpdate
  ): Promise<CheckinModel> {
    if (
      context.role !== 'admin' &&
      context.l_user_id !== checkin.ci_user_id
    ) {
      throw new Error('Unauthorized')
    }

    return this.repo.update(checkin)
  }

  async delete(
    context: AuthSchema,
    id: CheckinModel['ci_user_id']
  ): Promise<CheckinModel> {
    if (context.role !== 'admin' && context.l_user_id !== id) {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(id)
  }

  async find(
    context: AuthSchema,
    id: CheckinModel['ci_user_id']
  ): Promise<CheckinModel | undefined> {
    if (context.role !== 'admin' && context.l_user_id !== id) {
      throw new Error('Unauthorized')
    }

    return this.repo.find(id)
  }

  async findMany(context: AuthSchema): Promise<CheckinModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
