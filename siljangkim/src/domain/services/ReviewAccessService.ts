import { User } from '../entities/User'
import { IReviewRepository } from '../repositories/IReviewRepository'

export class ReviewAccessService {
  constructor(private reviewRepository: IReviewRepository) {}

  async canUserViewReviews(user: User): Promise<boolean> {
    // 사용자가 인증되지 않았으면 볼 수 없음
    if (!user.isVerified) {
      return false
    }

    // 관리자는 항상 볼 수 있음
    if (user.role === 'ADMIN') {
      return true
    }

    // 사용자가 작성한 리뷰가 있는지 확인
    const reviewCount = await this.reviewRepository.countByAuthorId(user.id)
    return reviewCount > 0
  }

  async canUserWriteReview(user: User): Promise<boolean> {
    return user.isVerified
  }
}