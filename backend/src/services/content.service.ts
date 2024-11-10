import type { AuthSchema } from '@/db/repo/auth.repo'
import ContentRepo from '@/db/repo/content.repo'
import type {
  ContentInput,
  ContentModel,
  ContentUpdate,
} from '@/db/schema/content.model'
import { Inject, Service } from 'typedi'

@Service()
export default class ContentService {
  @Inject()
  private readonly repo: ContentRepo

  async create(
    context: AuthSchema,
    contentInput: ContentInput
  ): Promise<ContentModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.create(contentInput)
  }

  async update(
    context: AuthSchema,
    contentUpdate: ContentUpdate
  ): Promise<ContentModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.update(contentUpdate)
  }

  async delete(
    context: AuthSchema,
    id: ContentModel['content_id']
  ): Promise<ContentModel> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.delete(id)
  }

  async find(
    context: AuthSchema,
    id: ContentModel['content_id']
  ): Promise<ContentModel | undefined> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.find(id)
  }

  async findMany(context: AuthSchema): Promise<ContentModel[]> {
    if (context.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    return this.repo.findMany()
  }
}
