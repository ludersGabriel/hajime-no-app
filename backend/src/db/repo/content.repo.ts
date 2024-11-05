import { Service } from 'typedi'
import type {
  ContentInput,
  ContentModel,
  ContentUpdate,
} from '../schema/content.model'
import db from '..'
import contentTable, { contentSchemas } from '../schema/content.model'
import { eq } from 'drizzle-orm'

@Service()
export default class ContentRepo {
  async create(classInput: ContentInput): Promise<ContentModel> {
    const [ret] = await db
      .insert(contentTable)
      .values(classInput)
      .returning()

    return contentSchemas.model.parse(ret)
  }

  async update(classUpdate: ContentUpdate): Promise<ContentModel> {
    const [ret] = await db
      .update(contentTable)
      .set(classUpdate)
      .where(eq(contentTable.content_id, classUpdate.content_id))
      .returning()

    return ret
  }

  async delete(id: ContentModel['content_id']): Promise<ContentModel> {
    const [ret] = await db
      .delete(contentTable)
      .where(eq(contentTable.content_id, id))
      .returning()

    return contentSchemas.model.parse(ret)
  }

  async find(
    id: ContentModel['content_id']
  ): Promise<ContentModel | undefined> {
    const [ret] = await db
      .select()
      .from(contentTable)
      .where(eq(contentTable.content_id, id))

    return ret ? contentSchemas.model.parse(ret) : undefined
  }
}
