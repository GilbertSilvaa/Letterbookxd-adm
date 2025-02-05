import { api, TResponseAPI } from '../httpClient'

type TDisableUserParams = {
  userId: number
}

type TDisableUserResponse = TResponseAPI<void>

export async function disable(params: TDisableUserParams) {
  const { data } = await api.patch<TDisableUserResponse>('/mod/deactivateUser', params)
  return data
}