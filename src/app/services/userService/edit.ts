import { User } from '@app/app/entities'
import { api, TResponseAPI } from '../httpClient'

type TEditUserParams = {
  id: number
  nickname: string
  name: string
  profile?: string
}

type TEditUserResponse = TResponseAPI<User>

export async function edit(params: TEditUserParams) {
  const { data } = await api.put<TEditUserResponse>('/crudMod/update', params)
  return data
}