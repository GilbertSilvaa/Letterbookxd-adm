import { api, TResponseAPI } from '../httpClient'
import { Report } from '@app/app/entities'

type TGetOpenedParams = {
  page: number
  pageSize: number
  sort: 'asc' | 'desc'
}

type TGetOpenedValue = {
  rows: Report[]
  count: number
}

type TGetOpenedResponse = TResponseAPI<TGetOpenedValue>

export async function getOpened(params: TGetOpenedParams) {
  const { data } = await api.get<TGetOpenedResponse>('/mod/filterOpenedReports', { params })
  return data
}