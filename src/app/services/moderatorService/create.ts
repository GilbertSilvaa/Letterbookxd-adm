import { User } from '@app/app/entities'
import { api, TResponseAPI } from '../httpClient'

type TCreateModeratorParams = {
  name: string
  email: string
  nickname: string
  password: string
}

type TCreateModeratorResponse = TResponseAPI<User>

export async function create(params: TCreateModeratorParams) {
  const { data } = await api.post<TCreateModeratorResponse>('/crudMod/insert', params)
  return data
}