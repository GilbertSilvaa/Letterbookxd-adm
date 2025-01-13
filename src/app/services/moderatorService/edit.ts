import { User } from '@app/app/entities'
import { api, TResponseAPI } from '../httpClient'

type TEditModeratorParams = {
  id: number
  nickname: string
  name: string
  profile?: string
}

type TEditModeratorResponse = TResponseAPI<User>

export async function edit(params: TEditModeratorParams) {
  const { data } = await api.put<TEditModeratorResponse>('/crudMod/update', params)
  return data
}