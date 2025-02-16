import axios from 'axios'
import { localStorageKeys } from '../config'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)
  if (accessToken) config.headers.Authorization = `auth-token ${accessToken}`
  return config
})

api.interceptors.response.use(async (data) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return data
})

export type TResponseAPI<T> = {
  code: number
  error: boolean
  message: string
  value: T
}