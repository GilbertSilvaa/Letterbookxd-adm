import { api, TResponseAPI } from '../httpClient'

type TGetReportsByUserParams = {
  page: number,
  pageSize: number,
  userReporterId?: number,
  userReportedId?: number
}

type TGetReportsByUserValue = {
  rows: Report[],
  count: number
}

type TGetReportsByUserResponse = TResponseAPI<TGetReportsByUserValue>

export async function getByUser(params: TGetReportsByUserParams) {
  const { data } = await api.get<TGetReportsByUserResponse>('/mod/filterReportsByUserId', { params })
  return data
}