import { useLogin } from '@client/api/auth/auth.mutation'
import { userQueryOptions } from '@client/api/user/user.query'
import { useAuth } from '@client/auth'
import PanelaButton from '@client/components/PanelaButton'
import PanelaInput from '@client/components/PanelaInput'
import { AuthInput } from '@server/db/repo/auth.repo'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Logo from '../assets/logo.png'
import ScreenContainer from '@client/components/ScreenContainer'

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
  const login = useLogin()
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  const form = useForm<AuthInput>({
    defaultValues: {
      password: '',
      username: '',
    },
  })

  const onSubmit = (formData: AuthInput) => {
    if (loading) return

    setLoading(true)
    login.mutate(formData, {
      onSuccess: (data) => {
        flushSync(() => {
          auth.setToken(data.token)
        })

        localStorage.setItem('corax-token', data.token)

        toast.success('Login successful')

        navigate({ to: '/dashboard' })
      },
      onError: () => {
        toast.error('Login failed')
      },
      onSettled: () => {
        setLoading(false)
      },
    })
  }

  return (
    <ScreenContainer noHeader>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col items-center mb-10'>
          <img
            src={Logo}
            alt='Logo'
            style={{
              width: '300px',
              height: '300px',
            }}
          />
          <h2>Bem vindo ao Panelapp!</h2>
          <h4>Junte-se aos seus amigos</h4>
          <h4>nessa jornada!</h4>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-5'>
            <PanelaInput
              {...form.register('username', {
                required: {
                  value: true,
                  message: 'Username is required',
                },
              })}
              placeholder='Usuário'
              label='Usuário'
              error={form.formState.errors.username?.message}
            />

            <PanelaInput
              {...form.register('password', {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              })}
              type='password'
              placeholder='Senha'
              label='Senha'
              error={form.formState.errors.password?.message}
            />

            <PanelaButton type='submit'>Login</PanelaButton>
          </div>
        </form>
      </div>
    </ScreenContainer>
  )
}
