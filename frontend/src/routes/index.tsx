import { useIndexQuery } from '@client/api'
import { useLogin } from '@client/api/auth/auth.mutation'
import { userQueryOptions } from '@client/api/user/user.query'
import { useAuth } from '@client/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthInput, authInputSchema } from '@server/db/repo/auth.repo'
import {
  createFileRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { flushSync } from 'react-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: async ({ context }) => {
    const client = context.queryClient

    try {
      const data = await client.fetchQuery(userQueryOptions)

      if (data?.user) {
        throw new Error('User authenticated')
      }
    } catch (e) {
      if (e instanceof Error && e.message === 'User authenticated') {
        throw redirect({
          to: '/dashboard',
        })
      }
    }
  },
})

function Home() {
  const { data } = useIndexQuery()
  const login = useLogin()
  const auth = useAuth()
  const navigate = useNavigate()

  const form = useForm<AuthInput>({
    resolver: zodResolver(authInputSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  })

  const onSubmit = (formData: AuthInput) => {
    login.mutate(formData, {
      onSuccess: (data) => {
        flushSync(() => {
          auth.setToken(data.token)
        })

        localStorage.setItem('corax-token', data.token)

        toast.success('Login successful')

        navigate({ to: '/dashboard' })
      },
    })
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-3'>
      <p>backend: {data?.message}</p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          className='mb-2 rounded w-full p-2'
          {...form.register('username', {
            required: true,
          })}
          placeholder='Username'
        />

        <input
          className='mb-2 rounded w-full p-2'
          {...form.register('password', { required: true })}
          placeholder='Password'
          type='password'
        />

        <button
          type='submit'
          className='rounded bg-blue-500 text-white p-2 w-full'
        >
          Login
        </button>
      </form>
    </div>
  )
}
