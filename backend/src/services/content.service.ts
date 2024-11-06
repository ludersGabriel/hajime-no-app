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
}


import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3
} from '@aws-sdk/client-s3';
import { v4 } from 'uuid';
import env from '@/env'

// This is the client we will use to deal with our S3 like service
const s3 = new S3({
  region: env.S3_REGION as string,
  forcePathStyle: true,
  endpoint: env.S3_URL as string,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: env.S3_ACCESS_KEY_SECRET as string,
  },
});


// This function will upload our document to the storage on a specific bucket
// and returns the id of the file on the S3 
// (if you want to keep a track on them)
const createDocument = async (
  file: File,
): Promise<string> => {
  // Create a specific uuid v4 to assign on the document on the s3 :) 
  const docId = v4();

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue("hello");
      controller.enqueue("world");
      controller.close();
    },
  });

  const params = {
    Bucket: env.S3_BUCKET as string,
    Key: docId,
    Body: stream,
    ContentType: file.type,
  };

  // Upload file to S3
  const uploadCommand = await s3.putObject(params)

  return docId;
};

// This function will fetch the document data on the S3 given an ID and
// return a byte array (file content) with a content type
// might throw an exception if the file does not exist.
const readDocument = async (
  docId: string
): Promise<{
  data: Uint8Array;
  contentType: string;
}> => {
  const readCommand = new GetObjectCommand({
    Bucket: env.S3_BUCKET as string,
    Key: docId,
  });
  const object = await s3.send(readCommand);
  const byteArray = await object.Body?.transformToByteArray();
  if (byteArray === undefined) {
    throw new Error('File does not exist');
  }

  return {
    data: byteArray,
    contentType: object.ContentType ?? 'application/octet-stream',
  };
};

// This function will delete the file on S3 given an ID
const deleteDocument = async (docId: string): Promise<void> => {
  const deleteCommand = new DeleteObjectCommand({
    Bucket: env.S3_BUCKET as string,
    Key: docId,
  });

  await s3.send(deleteCommand);
};

export { createDocument, deleteDocument, readDocument };
