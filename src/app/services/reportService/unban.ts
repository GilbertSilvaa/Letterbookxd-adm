import { api, TResponseAPI } from '../httpClient'

type TUnbanParams = {
  reportId: number
}

type TUnbanResponse = TResponseAPI<void>

export async function unban({ reportId }: TUnbanParams) {
  const { data } = await api.put<TUnbanResponse>('/mod/unbanReview', {
    reportReviewId: reportId
  })
  return data
}