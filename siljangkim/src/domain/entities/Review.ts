import { ReviewId } from '../value-objects/ReviewId'
import { UserId } from '../value-objects/UserId'
import { CoordinatorId } from '../value-objects/CoordinatorId'
import { Rating } from '../value-objects/Rating'

export interface ReviewRatings {
  professionalism: Rating
  communication: Rating
  responsibility: Rating
  cooperation: Rating
  kindness: Rating
}

export interface ReviewProps {
  id: ReviewId
  coordinatorId: CoordinatorId
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

  get coordinatorId(): CoordinatorId {
    return this.props.coordinatorId
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
      coordinatorId: this.props.coordinatorId.value,
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