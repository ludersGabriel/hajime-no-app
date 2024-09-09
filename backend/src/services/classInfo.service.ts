import type { AuthSchema } from '@/db/repo/auth.repo'
import ClassInfoRepo from '@/db/repo/classInfo.repo'
import type {
  ClassInfoInput,
  ClassInfoModel,
  ClassInfoUpdate,
} from '@/db/schema/classInfo.model'
import { Inject, Service } from 'typedi'

@Service()
export default class ClassInfoService {
  @Inject()
  private readonly repo: ClassInfoRepo

  async create(
    context: AuthSchema,
    classInfo: ClassInfoInput
  ): Promise<ClassInfoModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.create(classInfo)
  }

  async update(
    context: AuthSchema,
    classInfo: ClassInfoUpdate
  ): Promise<ClassInfoModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.update(classInfo)
  }

  async delete(
    context: AuthSchema,
    id: ClassInfoModel['ci_class_id']
  ): Promise<ClassInfoModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(id)
  }

  // ! need to check subscription status here
  async find(
    context: AuthSchema,
    id: ClassInfoModel['ci_class_id']
  ): Promise<ClassInfoModel | undefined> {
    return this.repo.find(id)
  }

  // ! need to check subscription status here
  async findMany(context: AuthSchema): Promise<ClassInfoModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
