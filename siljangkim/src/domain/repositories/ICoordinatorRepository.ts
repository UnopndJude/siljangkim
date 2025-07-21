import { Coordinator } from '../entities/Coordinator'
import { CoordinatorId } from '../value-objects/CoordinatorId'

export interface SearchCriteria {
  name?: string
  hospitalName?: string
  position?: string
  department?: string
}

export interface ICoordinatorRepository {
  findById(id: CoordinatorId): Promise<Coordinator | null>
  findByNameAndHospital(name: string, hospitalName: string): Promise<Coordinator | null>
  search(criteria: SearchCriteria, limit?: number, offset?: number): Promise<Coordinator[]>
  save(coordinator: Coordinator): Promise<void>
  update(coordinator: Coordinator): Promise<void>
  delete(id: CoordinatorId): Promise<void>
}