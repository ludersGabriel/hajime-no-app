import { api } from '..'
import { useMutation } from '@tanstack/react-query'
import { ContentInput } from '@server/db/schema/content.model'
import { useAuth } from '@client/auth'

export function useUploadContent() {
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['contentUpload'],
    mutationFn: async (input: {
      content: ContentInput
      file: File
    }) => {
      if (!token) throw new Error('No token')

      // Cria o content na database
      const createEntry = await api.content.create.$post(
        { json: input.content },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (!createEntry.ok) throw new Error('Not authenticated')

      const result = await createEntry.json()

      const docId = result.content.content_id

      const uploadFile = await api.content.storage[':id'].$get(
        { param: { id: docId } },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const uploadUrl = await uploadFile.text()

      const ret = await fetch(uploadUrl, {
        method: 'PUT',
        body: input.file,
      })

      return ret
    },
  })
}
