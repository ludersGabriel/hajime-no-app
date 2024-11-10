import { createFileRoute } from '@tanstack/react-router'
import { ContentInput } from '@server/db/schema/content.model'

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
})

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUploadContent } from '@client/api/content/content.query'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user } = Route.useRouteContext()
  const [loading, setLoading] = useState(false)

  const content = useUploadContent()

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
    const format = inputFile.name.split('.').pop() as
      | 'mp4'
      | 'png'
      | 'jpg'

    const payload: ContentInput = {
      name: formData.name,
      size: inputFile.size,
      format: format,
    }

    content.mutate(
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
    <div>
      <div className='bg-red-400 flex justify-center align-middle items-center'>
        <p>Welcome to the dashboard, {user.user_id}</p>
      </div>

      <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1>File Upload</h1>
          <input
            type='text'
            {...form.register('name', { required: true })}
          />
          <input
            type='file'
            {...form.register('files', { required: true })}
            accept='.jpg, .png, .mp4'
          />
          <button type='submit'>Upload</button>
        </form>
      </div>
    </div>
  )
}
