import { Doctor } from '../entities/Doctor'
import { DoctorId } from '../value-objects/DoctorId'

export interface IDoctorRepository {
  save(doctor: Doctor): Promise<void>
  findById(id: DoctorId): Promise<Doctor | null>
  findAll(): Promise<Doctor[]>
  findByName(name: string): Promise<Doctor[]>
  findByHospitalName(hospitalName: string): Promise<Doctor[]>
  delete(id: DoctorId): Promise<void>
}