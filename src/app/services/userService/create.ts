import { User } from '@app/app/entities'
import { api, TResponseAPI } from '../httpClient'

type TCreateUserParams = {
  name: string
  email: string
  nickname: string
  password: string
}

type TCreateUserResponse = TResponseAPI<User>

export async function create(params: TCreateUserParams) {
  const { data } = await api.post<TCreateUserResponse>('/crudMod/insert', params)
  return data
}