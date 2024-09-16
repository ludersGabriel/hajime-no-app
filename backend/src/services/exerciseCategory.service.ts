import type { AuthSchema } from '@/db/repo/auth.repo'
import ExerciseCategoryRepo from '@/db/repo/exerciseCategory.repo'
import type {
  ExerciseCategoryInput,
  ExerciseCategoryModel,
  ExerciseCategoryUpdate,
} from '@/db/schema/exerciseCategory.model'
import { Inject, Service } from 'typedi'

@Service()
export default class ExerciseCategoryService {
  @Inject()
  private readonly repo: ExerciseCategoryRepo

  async create(
    context: AuthSchema,
    exerciseCategory: ExerciseCategoryInput
  ): Promise<ExerciseCategoryModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.create(exerciseCategory)
  }

  async update(
    context: AuthSchema,
    exerciseCategory: ExerciseCategoryUpdate
  ): Promise<ExerciseCategoryModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.update(exerciseCategory)
  }

  async delete(
    context: AuthSchema,
    id: ExerciseCategoryModel['category_id']
  ): Promise<ExerciseCategoryModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(id)
  }

  // ! sub status
  async find(
    context: AuthSchema,
    id: ExerciseCategoryModel['category_id']
  ): Promise<ExerciseCategoryModel | undefined> {
    return this.repo.find(id)
  }

  async findMany(
    context: AuthSchema
  ): Promise<ExerciseCategoryModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
