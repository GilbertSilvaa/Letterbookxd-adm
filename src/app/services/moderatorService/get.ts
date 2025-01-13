import { User } from '@app/app/entities'
import { api, TResponseAPI } from '../httpClient'

type TGetModeratorParams = {
  page: number
  pageSize: number
  search?: string
}

type TGetModeratorValue = {
  rows: User[]
  count: number
}

type TGetModeratorResponse = TResponseAPI<TGetModeratorValue>

export async function get(params: TGetModeratorParams) {
  const { data } = await api.get<TGetModeratorResponse>('/crudMod/filter', { params })
  return data
}