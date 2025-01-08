import { User } from '@app/app/entities'
import { api, TResponseAPI } from '../httpClient'

type TGetUsersParams = {
  page: number
  pageSize: number
  search?: string
}

type TGetUsersValue = {
  rows: User[]
  count: number
}

type TGetUsersResponse = TResponseAPI<TGetUsersValue>

export async function get(params: TGetUsersParams) {
  const { data } = await api.get<TGetUsersResponse>('/crudMod/filter', { params })
  return data
}