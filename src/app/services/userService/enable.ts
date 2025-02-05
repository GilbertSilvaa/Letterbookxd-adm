import { api, TResponseAPI } from '../httpClient'

type TEnableUserParams = {
  userId: number
}

type TEnableUserResponse = TResponseAPI<void>

export async function enable(params: TEnableUserParams) {
  const { data } = await api.patch<TEnableUserResponse>('/mod/activateUser', params)
  return data
}