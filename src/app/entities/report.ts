import { Review } from './review'
import { User } from './user'

type TReportParams = {
  id: number
  reason: string
  originalComment: string
  reviewId: number
  userId: number
  moderatorId?: number  
  reviewType: 'BOOK' | 'BOOKLIST'
  status: 'OPENED' | 'CLOSED'
  creationDate: string
  review: Review
  user: User
}

export class Report {
  id: number
  reason: string
  originalComment: string
  reviewId: number
  userId: number
  moderatorId?: number  
  reviewType: 'BOOK' | 'BOOKLIST'
  status: 'OPENED' | 'CLOSED'
  creationDate: string
  review: Review
  user: User

  constructor(params: TReportParams) {
    this.id = params.id
    this.reason = params.reason
    this.originalComment = params.originalComment
    this.reviewId = params.reviewId
    this.userId = params.userId
    this.reviewType = params.reviewType
    this.status = params.status
    this.creationDate = params.creationDate
    this.review = params.review
    this.user = params.user
  }
}