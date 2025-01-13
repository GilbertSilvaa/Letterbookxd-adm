import { auth } from './auth'
import { create } from './create'
import { edit } from './edit'
import { get } from './get'
import { me } from './me'
import { remove } from './remove'

export const moderatorService = {
  me,
  auth,
  get,
  create,
  edit,
  remove
}