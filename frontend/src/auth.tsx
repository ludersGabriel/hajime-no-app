import { UserDto } from '@server/db/schema/user.model'
import { ReactNode } from '@tanstack/react-router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { flushSync } from 'react-dom'
import toast from 'react-hot-toast'
import { useUser } from './api/user/user.query'

export interface AuthContext {
  token: string | undefined
  user: UserDto | undefined
  setToken: (token: string | undefined) => void
  isLoading: boolean
  logout: () => void
}

const Context = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | undefined>(undefined)
  const { data, isPending } = useUser(token)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // grab token
  useEffect(() => {
    const token = localStorage.getItem('corax-token')

    if (token) setToken(token)
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    flushSync(() => setToken(undefined))
    localStorage.removeItem('corax-token')
    toast.success('Logged out')
    window.location.reload()
  }, [])

  return (
    <Context.Provider
      value={{
        isLoading: isLoading || isPending,
        logout,
        token,
        setToken,
        user: data,
      }}
    >
      {children}
    </Context.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
