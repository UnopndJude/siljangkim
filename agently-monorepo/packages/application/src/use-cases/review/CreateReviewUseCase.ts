import {
  Review,
  User,
  ReviewId,
  CoordinatorId,
  Rating,
  IReviewRepository,
  ICoordinatorRepository,
  ReviewAccessService
} from '@agently/domain'

export interface CreateReviewDTO {
  coordinatorId: string
  ratings: {
    overall: number
    professionalism?: number
    communication?: number
    responsibility?: number
    cooperation?: number
  }
  workYear?: number
  workDuration?: string
  title: string
  content: string
  isAnonymous: boolean
}

export class CreateReviewUseCase {
  constructor(
    private reviewRepository: IReviewRepository,
    private coordinatorRepository: ICoordinatorRepository,
    private reviewAccessService: ReviewAccessService
  ) {}

  async execute(dto: CreateReviewDTO, user: User): Promise<Review> {
    // 사용자가 리뷰를 작성할 수 있는지 확인
    const canWrite = await this.reviewAccessService.canUserWriteReview(user)
    if (!canWrite) {
      throw new Error('User is not verified to write reviews')
    }

    // 코디네이터 존재 확인
    const coordinatorId = CoordinatorId.create(dto.coordinatorId)
    const coordinator = await this.coordinatorRepository.findById(coordinatorId)
    if (!coordinator) {
      throw new Error('Coordinator not found')
    }

    // 중복 리뷰 확인
    const hasReviewed = await this.reviewRepository.hasUserReviewedCoordinator(
      user.id,
      coordinatorId
    )
    if (hasReviewed) {
      throw new Error('User has already reviewed this coordinator')
    }

    // 리뷰 생성
    const review = Review.create({
      id: ReviewId.create(),
      coordinatorId,
      authorId: user.id,
      ratings: {
        overall: Rating.create(dto.ratings.overall),
        professionalism: dto.ratings.professionalism ? Rating.create(dto.ratings.professionalism) : undefined,
        communication: dto.ratings.communication ? Rating.create(dto.ratings.communication) : undefined,
        responsibility: dto.ratings.responsibility ? Rating.create(dto.ratings.responsibility) : undefined,
        cooperation: dto.ratings.cooperation ? Rating.create(dto.ratings.cooperation) : undefined
      },
      workYear: dto.workYear,
      workDuration: dto.workDuration,
      title: dto.title,
      content: dto.content,
      isAnonymous: dto.isAnonymous,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await this.reviewRepository.save(review)
    return review
  }
}