import { EReportStatus } from '@app/app/enums'
import { api, TResponseAPI } from '../httpClient'
import { Report } from '@app/app/entities'

type THandleParams = {
  reportId: number
  status: EReportStatus
}

type THandleResponse = TResponseAPI<Report>

export async function handle({ reportId, status }: THandleParams) {
  const { data } = await api.put<THandleResponse>('/mod/handleReport', {
    reportReviewId: reportId,
    status
  })
  return data
}