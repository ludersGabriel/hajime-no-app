import type { AuthSchema } from '@/db/repo/auth.repo'
import ExerciseInfoRepo from '@/db/repo/exerciseInfo.repo'
import type {
  ExerciseInfoInput,
  ExerciseInfoModel,
  ExerciseInfoUpdate,
} from '@/db/schema/exerciseInfo.model'
import { Inject, Service } from 'typedi'

@Service()
export default class ExerciseInfoService {
  @Inject()
  private readonly repo: ExerciseInfoRepo

  async create(
    context: AuthSchema,
    exerciseInfo: ExerciseInfoInput
  ): Promise<ExerciseInfoModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.create(exerciseInfo)
  }

  async update(
    context: AuthSchema,
    exerciseInfo: ExerciseInfoUpdate
  ): Promise<ExerciseInfoModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.update(exerciseInfo)
  }

  async delete(
    context: AuthSchema,
    id: ExerciseInfoModel['ei_exercise_id']
  ): Promise<ExerciseInfoModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(id)
  }

  // ! sub status
  async find(
    context: AuthSchema,
    id: ExerciseInfoModel['ei_exercise_id']
  ): Promise<ExerciseInfoModel | undefined> {
    return this.repo.find(id)
  }

  async findMany(context: AuthSchema): Promise<ExerciseInfoModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
