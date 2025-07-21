import { Review } from '../../../domain/entities/Review'
import { User } from '../../../domain/entities/User'
import { CoordinatorId } from '../../../domain/value-objects/CoordinatorId'
import { IReviewRepository } from '../../../domain/repositories/IReviewRepository'
import { ReviewAccessService } from '../../../domain/services/ReviewAccessService'

export interface GetReviewsDTO {
  coordinatorId?: string
  minRating?: number
  maxRating?: number
  limit?: number
  offset?: number
}

export class GetReviewsUseCase {
  constructor(
    private reviewRepository: IReviewRepository,
    private reviewAccessService: ReviewAccessService
  ) {}

  async execute(dto: GetReviewsDTO, user: User): Promise<Review[]> {
    // 사용자가 리뷰를 볼 수 있는지 확인
    const canView = await this.reviewAccessService.canUserViewReviews(user)
    if (!canView) {
      throw new Error('User must write a review before viewing others')
    }

    const criteria = {
      coordinatorId: dto.coordinatorId ? CoordinatorId.create(dto.coordinatorId) : undefined,
      minRating: dto.minRating,
      maxRating: dto.maxRating
    }

    return await this.reviewRepository.search(
      criteria,
      dto.limit || 20,
      dto.offset || 0
    )
  }
}