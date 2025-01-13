import { User } from '@app/app/entities'
import { api, TResponseAPI } from '../httpClient'

type TAuthParams = {
  email: string
  password: string
}

type TAuthValue = {
  auth: boolean
  token: string
  user: User | undefined
}

type TAuthResponse = TResponseAPI<TAuthValue>

export async function auth(params: TAuthParams) {
  const { data } = await api.post<TAuthResponse>('/auth/mod/login', params)
  return data
}