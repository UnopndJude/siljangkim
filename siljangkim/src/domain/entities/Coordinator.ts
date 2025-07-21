import { CoordinatorId } from '../value-objects/CoordinatorId'
import { Email } from '../value-objects/Email'
import { PhoneNumber } from '../value-objects/PhoneNumber'

export interface CoordinatorProps {
  id: CoordinatorId
  name: string
  hospitalName: string
  position?: string
  department?: string
  phoneNumber?: PhoneNumber
  email?: Email
  createdAt: Date
  updatedAt: Date
}

export class Coordinator {
  private constructor(private props: CoordinatorProps) {}

  static create(props: CoordinatorProps): Coordinator {
    return new Coordinator(props)
  }

  get id(): CoordinatorId {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get hospitalName(): string {
    return this.props.hospitalName
  }

  get position(): string | undefined {
    return this.props.position
  }

  get department(): string | undefined {
    return this.props.department
  }

  updateContactInfo(email?: Email, phoneNumber?: PhoneNumber): void {
    if (email) {
      this.props.email = email
    }
    if (phoneNumber) {
      this.props.phoneNumber = phoneNumber
    }
    this.props.updatedAt = new Date()
  }

  updatePosition(position: string, department?: string): void {
    this.props.position = position
    if (department) {
      this.props.department = department
    }
    this.props.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.props.id.value,
      name: this.props.name,
      hospitalName: this.props.hospitalName,
      position: this.props.position,
      department: this.props.department,
      phoneNumber: this.props.phoneNumber?.value,
      email: this.props.email?.value,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt
    }
  }
}