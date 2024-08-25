import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { localStorageKeys } from '../config'
import { User } from '../entities'
import { userService } from '../services/userService'

type TAuthContextValue = {
  signedIn: boolean
  user: User | undefined
  signIn(accessToken: string): void
  signOut(): void
}

type TAuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as TAuthContextValue)

export function AuthProvider({ children }: TAuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)
    return !!storageAccessToken
  })

  const { isError, isFetching, isSuccess, data, refetch } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => userService.me(),
    enabled: signedIn,
    staleTime: Infinity
  })

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken)
    setSignedIn(true)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    refetch()
    setSignedIn(false)
  }, [refetch])

  useEffect(() => {
    if (isError) signOut()
  }, [isError, signOut])

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data?.value,
        signIn,
        signOut
      }}
    >
      {!isFetching && children}
    </AuthContext.Provider>
  )
}