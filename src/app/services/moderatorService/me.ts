import { User } from '../../entities'
import { api, TResponseAPI } from '../httpClient'

type TMeResponse = TResponseAPI<User>

export async function me() {
  const { data } = await api.get<TMeResponse>('/crudMod/me')
  return data
}