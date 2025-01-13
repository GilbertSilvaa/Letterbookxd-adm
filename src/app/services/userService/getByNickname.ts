import { User } from '@app/app/entities'
import { api, TResponseAPI } from '../httpClient'

type TGetUsersByNicknameParams = {
  page: number
  pageSize: number
  search?: string
}

type TGetUsersDTO = Partial<User> & {
  reviewsCount: number
  reportsDoneCount: number
  successfulReportsCount: number
  reportsReceivedCount: number
  blocksPerformedCount: number
  blocksReceivedCount: number
}

type TGetUsersByNicknameValue = {
  rows: TGetUsersDTO[]
  count: number
}

type TGetUsersByNicknameResponse = TResponseAPI<TGetUsersByNicknameValue>

export async function getByNickname(params: TGetUsersByNicknameParams) {
  const { data } = await api.get<TGetUsersByNicknameResponse>('/mod/filterUsersByNickname', { params })
  return data
}