import { DeleteResult } from "typeorm"

export default interface RepositoryInterface<T> {
  create(entity: T): Promise<T>
  update(entity: T, id: string): Promise<T>
  delete(id: string): Promise<DeleteResult>
  findById(id: string): Promise<T>
  findAll(): Promise<T[]>
}