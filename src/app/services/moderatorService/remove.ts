import { api, TResponseAPI } from '../httpClient'

type TRemoveModeratorResponse = TResponseAPI<void>

export async function remove(id: number) {
  const { data } = await api.delete<TRemoveModeratorResponse>(`/crudMod/delete/${id}`)
  return data
}