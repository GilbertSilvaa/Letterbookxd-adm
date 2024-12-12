import { User } from './user'

type TReviewParams = {
  id: number
  stars: number
  comment: string
  userId: number
  creationDate: string
  user: User
}

export class Review {
  id: number
  stars: number
  comment: string
  userId: number
  creationDate: string
  user: User

  constructor(params: TReviewParams) {
    this.id = params.id
    this.stars = params.stars
    this.comment = params.comment
    this.userId = params.userId
    this.creationDate = params.creationDate
    this.user = params.user
  }
}