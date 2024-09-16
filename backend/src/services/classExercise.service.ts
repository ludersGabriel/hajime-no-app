import type { AuthSchema } from '@/db/repo/auth.repo'
import ClassExerciseRepo from '@/db/repo/classExercise.repo'
import type {
  ClassExerciseInput,
  ClassExerciseModel,
  ClassExerciseUpdate,
} from '@/db/schema/classExercise.model'
import { Inject, Service } from 'typedi'

@Service()
export default class ClassExerciseService {
  @Inject()
  private readonly repo: ClassExerciseRepo

  async create(
    context: AuthSchema,
    classExercise: ClassExerciseInput
  ): Promise<ClassExerciseModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.create(classExercise)
  }

  async update(
    context: AuthSchema,
    classExercise: ClassExerciseUpdate
  ): Promise<ClassExerciseModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.update(classExercise)
  }

  async delete(
    context: AuthSchema,
    class_id: ClassExerciseModel['ce_class_id'],
    exercise_id: ClassExerciseModel['ce_exercise_id']
  ): Promise<ClassExerciseModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(class_id, exercise_id)
  }

  // ! need to check subscription status here
  async find(
    context: AuthSchema,
    class_id: ClassExerciseModel['ce_class_id'],
    exercise_id: ClassExerciseModel['ce_exercise_id']
  ): Promise<ClassExerciseModel | undefined> {
    return this.repo.find(class_id, exercise_id)
  }

  // ! need to check subscription status here
  async findMany(context: AuthSchema): Promise<ClassExerciseModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
