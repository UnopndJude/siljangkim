import { DoctorId } from '../value-objects/DoctorId'

export interface DoctorProps {
  id: DoctorId
  name: string
  hospitalName: string
  position?: string
  department?: string
  phoneNumber?: string
  email?: string
  specialties: string[]  // 전문 분야
  createdAt: Date
  updatedAt: Date
}

export class Doctor {
  private constructor(private props: DoctorProps) {}

  static create(props: DoctorProps): Doctor {
    return new Doctor(props)
  }

  get id(): DoctorId {
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

  get phoneNumber(): string | undefined {
    return this.props.phoneNumber
  }

  get email(): string | undefined {
    return this.props.email
  }

  get specialties(): string[] {
    return this.props.specialties
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  updateProfile(updates: Partial<Pick<DoctorProps, 'name' | 'position' | 'department' | 'phoneNumber' | 'email' | 'specialties'>>): void {
    if (updates.name !== undefined) this.props.name = updates.name
    if (updates.position !== undefined) this.props.position = updates.position
    if (updates.department !== undefined) this.props.department = updates.department
    if (updates.phoneNumber !== undefined) this.props.phoneNumber = updates.phoneNumber
    if (updates.email !== undefined) this.props.email = updates.email
    if (updates.specialties !== undefined) this.props.specialties = updates.specialties
    
    this.props.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.props.id.value,
      name: this.props.name,
      hospitalName: this.props.hospitalName,
      position: this.props.position,
      department: this.props.department,
      phoneNumber: this.props.phoneNumber,
      email: this.props.email,
      specialties: this.props.specialties,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt
    }
  }
}