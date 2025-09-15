import { ReviewId } from '../value-objects/ReviewId'
import { UserId } from '../value-objects/UserId'
import { CoordinatorId } from '../value-objects/CoordinatorId'
import { DoctorId } from '../value-objects/DoctorId'
import { Rating } from '../value-objects/Rating'

export interface ReviewRatings {
  professionalism: Rating    // 전문성
  communication: Rating      // 소통능력
  responsibility: Rating     // 책임감
  cooperation: Rating        // 협업능력
  kindness: Rating          // 친절도
}

export interface ReviewProps {
  id: ReviewId
  targetId: CoordinatorId | DoctorId  // 평가 대상 ID (Coordinator 또는 Doctor)
  targetType: 'coordinator' | 'doctor'  // 평가 대상 타입
  authorId: UserId
  ratings: ReviewRatings
  workYear?: number
  workDuration?: string
  title: string
  content: string
  isAnonymous: boolean
  createdAt: Date
  updatedAt: Date
}

export class Review {
  private constructor(private props: ReviewProps) {}

  static create(props: ReviewProps): Review {
    if (props.title.length < 5) {
      throw new Error('Review title must be at least 5 characters')
    }
    if (props.content.length < 20) {
      throw new Error('Review content must be at least 20 characters')
    }
    return new Review(props)
  }

  get id(): ReviewId {
    return this.props.id
  }

  get targetId(): CoordinatorId | DoctorId {
    return this.props.targetId
  }

  get targetType(): 'coordinator' | 'doctor' {
    return this.props.targetType
  }

  get authorId(): UserId {
    return this.props.authorId
  }

  get ratings(): ReviewRatings {
    return this.props.ratings
  }

  get title(): string {
    return this.props.title
  }

  get content(): string {
    return this.props.content
  }

  get isAnonymous(): boolean {
    return this.props.isAnonymous
  }

  get averageRating(): number {
    const ratings = [
      this.props.ratings.professionalism.value,
      this.props.ratings.communication.value,
      this.props.ratings.responsibility.value,
      this.props.ratings.cooperation.value,
      this.props.ratings.kindness.value
    ]

    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
  }

  canBeEditedBy(userId: UserId): boolean {
    return this.props.authorId.equals(userId)
  }

  update(title: string, content: string, ratings: ReviewRatings): void {
    if (title.length < 5) {
      throw new Error('Review title must be at least 5 characters')
    }
    if (content.length < 20) {
      throw new Error('Review content must be at least 20 characters')
    }
    
    this.props.title = title
    this.props.content = content
    this.props.ratings = ratings
    this.props.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.props.id.value,
      targetId: this.props.targetId instanceof CoordinatorId 
        ? this.props.targetId.value 
        : this.props.targetId.value,
      targetType: this.props.targetType,
      authorId: this.props.isAnonymous ? 'anonymous' : this.props.authorId.value,
      ratings: {
        professionalism: this.props.ratings.professionalism.value,
        communication: this.props.ratings.communication.value,
        responsibility: this.props.ratings.responsibility.value,
        cooperation: this.props.ratings.cooperation.value,
        kindness: this.props.ratings.kindness.value
      },
      workYear: this.props.workYear,
      workDuration: this.props.workDuration,
      title: this.props.title,
      content: this.props.content,
      isAnonymous: this.props.isAnonymous,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt
    }
  }
}