import { getByUser } from './getByUser'
import { getClosed } from './getClosed'
import { getOpened } from './getOpened'
import { handle } from './handle'
import { unban } from './unban'

export const reportService = {
  getOpened,
  getClosed,
  handle,
  unban,
  getByUser
}