import type { AuthSchema } from '@/db/repo/auth.repo'
import ClassRepo from '@/db/repo/class.repo'
import type {
  ClassInput,
  ClassModel,
  ClassUpdate,
} from '@/db/schema/class.model'
import { Inject, Service } from 'typedi'

@Service()
export default class ClassService {
  @Inject()
  private readonly repo: ClassRepo

  async create(
    context: AuthSchema,
    classInput: ClassInput
  ): Promise<ClassModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.create(classInput)
  }

  async update(
    context: AuthSchema,
    classUpdate: ClassUpdate
  ): Promise<ClassModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.update(classUpdate)
  }

  async delete(
    context: AuthSchema,
    id: ClassModel['class_id']
  ): Promise<ClassModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(id)
  }

  async find(
    context: AuthSchema,
    id: ClassModel['class_id']
  ): Promise<ClassModel | undefined> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.find(id)
  }

  async findMany(context: AuthSchema): Promise<ClassModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
