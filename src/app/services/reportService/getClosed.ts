import { api, TResponseAPI } from '../httpClient'
import { Report } from '@app/app/entities'

type TGetClosedParams = {
  page: number
  pageSize: number
}

type TGetClosedValue = {
  rows: Report[]
  count: number
}

type TGetClosedResponse = TResponseAPI<TGetClosedValue>

export async function getClosed(params: TGetClosedParams) {
  const { data } = await api.get<TGetClosedResponse>('/mod/reportHistory', { params })
  return data
}