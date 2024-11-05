import { api } from '..'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ContentInput } from '@server/db/schema/content.model'
import { useAuth } from '@client/auth'

export function useUploadContent() {
  const { token } = useAuth()

  return useMutation({
    mutationKey: ['contentUpload'],
    mutationFn: async (input: { content: ContentInput; file: File }) => {
      if (!token) throw new Error('No token')

      // Cria o content na database
      const createEntry = await api.content.create.$post(
        { json: input.content },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (!createEntry.ok) throw new Error('Not authenticated')

      const result = await createEntry.json()

      const docId = result.content.content_id

      const uploadFile = await api.content.storage.upload[':id'].$get(
        { param: { id: docId } },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (!uploadFile.ok) throw new Error('Failure on getting pressigned URL')

      const uploadUrl = await uploadFile.text()

      const ret = await fetch(uploadUrl, {
        method: 'PUT',
        body: input.file,
      })

      return ret
    },
  })
}

export function useDownloadContent(docId: string) {
  const { token } = useAuth()

  const options = {
    queryKey: ['downloadContent', docId],
    queryFn: async () => {
      if (!token) throw new Error('No token')

      const request = await api.content.storage.download[':id'].$get(
        { param: { id: docId } },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const downloadUrl = await request.text()

      const ret = await fetch(downloadUrl)

      return ret
    },
  }

  return useQuery(options)
}

export function useContentListQuery(page: number, pageSize: number) {
  const { token } = useAuth()

  const options = {
    queryKey: ['contentList', page, pageSize],
    queryFn: async () => {
      if (!token) throw new Error('No token')

      const request = await api.content.list.$get(undefined, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!request.ok) throw new Error('Not authenticated')

      const contents = await request.json()

      return contents
    },
  }

  return useQuery(options)
}
