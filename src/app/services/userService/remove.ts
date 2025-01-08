import { api, TResponseAPI } from '../httpClient'

type TRemoveUserResponse = TResponseAPI<void>

export async function remove(id: number) {
  const { data } = await api.delete<TRemoveUserResponse>(`/crudMod/delete/${id}`)
  return data
}