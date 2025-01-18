import { api, TResponseAPI } from '../httpClient'

type TGetDashboardDataDTO = {
  openedReport?: number
  reportsResolvedByMod?: number
  reportsAcceptedByMod?: number
  reportsRejectedByMod?: number
}

type TGetDashboardDataResponse = TResponseAPI<TGetDashboardDataDTO>

export async function getData() {
  const { data } = await api.get<TGetDashboardDataResponse>('/mod/dashboarddata')
  return data
}