import axios from 'axios'
import { localStorageKeys } from '../config'

export const api = axios.create({ baseURL: 'http://localhost:3000' })

api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)
  if (accessToken) config.headers.Authorization = `auth-token ${accessToken}`
  return config
})

export type TResponseAPI<T> = {
  code: number
  error: boolean
  message: string
  value: T
}