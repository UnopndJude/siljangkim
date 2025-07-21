import { Review } from '../entities/Review'
import { ReviewId } from '../value-objects/ReviewId'
import { UserId } from '../value-objects/UserId'
import { CoordinatorId } from '../value-objects/CoordinatorId'

export interface ReviewSearchCriteria {
  coordinatorId?: CoordinatorId
  authorId?: UserId
  minRating?: number
  maxRating?: number
}

export interface IReviewRepository {
  findById(id: ReviewId): Promise<Review | null>
  findByCoordinatorId(coordinatorId: CoordinatorId, limit?: number, offset?: number): Promise<Review[]>
  findByAuthorId(authorId: UserId, limit?: number, offset?: number): Promise<Review[]>
  search(criteria: ReviewSearchCriteria, limit?: number, offset?: number): Promise<Review[]>
  countByAuthorId(authorId: UserId): Promise<number>
  hasUserReviewedCoordinator(authorId: UserId, coordinatorId: CoordinatorId): Promise<boolean>
  save(review: Review): Promise<void>
  update(review: Review): Promise<void>
  delete(id: ReviewId): Promise<void>
}