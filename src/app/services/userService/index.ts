import { auth } from './auth'
import { get } from './get'
import { me } from './me'

export const userService = {
  me,
  auth,
  get
}