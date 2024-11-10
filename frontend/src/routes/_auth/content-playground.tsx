import { createFileRoute } from '@tanstack/react-router'
import { ContentInput } from '@server/db/schema/content.model'

export const Route = createFileRoute('/_auth/content-playground')({
  component: ContentPlayground,
})

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useUploadContent,
  useContentListQuery,
} from '@client/api/content/content.query'
import toast from 'react-hot-toast'

function ContentList({ page, pageSize }: { page: number; pageSize: number }) {
  const { isPending, isError, data, error } = useContentListQuery(
    page,
    pageSize
  )

  if (isPending) return <span>Loading...</span>

  if (isError) return <span>Error: {error.message}</span>

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((content) => (
        <li key={content.content_id}>{content.name}</li>
      ))}
    </ul>
  )
}

function ContentUploadForm() {
  const [loading, setLoading] = useState(false)

  const contentUpload = useUploadContent()

  type ContentFormInput = {
    name: string
    files: FileList
  }
  const form = useForm<ContentFormInput>()

  const onSubmit = (formData: ContentFormInput) => {
    if (loading) return
    if (formData.files.length < 1) return

    setLoading(true)

    // get first file from list
    const inputFile = formData.files[0]

    // get file format from filename
    // TODO: validate this shit somehow
    const format = inputFile.name.split('.').pop() as 'mp4' | 'png' | 'jpg'

    const payload: ContentInput = {
      name: formData.name,
      size: inputFile.size,
      format: format,
    }

    contentUpload.mutate(
      { content: payload, file: inputFile },
      {
        onSuccess: () => {},
        onError: () => {
          toast.error('Content creation failed')
        },
        onSettled: () => {
          setLoading(false)
        },
      }
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <h1>File Upload</h1>

      <input type='text' {...form.register('name', { required: true })} />

      <input
        type='file'
        {...form.register('files', { required: true })}
        accept='.jpg, .png, .mp4'
      />

      <button type='submit'>Upload</button>
    </form>
  )
}

export default function ContentPlayground() {
  const page = 1
  const pageSize = 50

  return (
    <div>
      <ContentUploadForm></ContentUploadForm>
      <ContentList page={page} pageSize={pageSize}></ContentList>

      <div className='text-black'>
        <input type='number' placeholder='Page' />
      </div>

      <div className='text-black'>
        <input type='number' placeholder='Page Size' />
      </div>
    </div>
  )
}
