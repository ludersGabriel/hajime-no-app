import type { AuthSchema } from '@/db/repo/auth.repo'
import ExerciseRepo from '@/db/repo/exercise.repo'
import type {
  ExerciseInput,
  ExerciseModel,
  ExerciseUpdate,
} from '@/db/schema/exercise.model'
import { Inject, Service } from 'typedi'

@Service()
export default class ExerciseService {
  @Inject()
  private readonly repo: ExerciseRepo

  async create(
    context: AuthSchema,
    exercise: ExerciseInput
  ): Promise<ExerciseModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.create(exercise)
  }

  async update(
    context: AuthSchema,
    exercise: ExerciseUpdate
  ): Promise<ExerciseModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.update(exercise)
  }

  async delete(
    context: AuthSchema,
    id: ExerciseModel['exercise_id']
  ): Promise<ExerciseModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(id)
  }

  // ! sub status
  async find(
    context: AuthSchema,
    id: ExerciseModel['exercise_id']
  ): Promise<ExerciseModel | undefined> {
    return this.repo.find(id)
  }

  async findMany(context: AuthSchema): Promise<ExerciseModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
