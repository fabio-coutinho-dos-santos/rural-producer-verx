import { DeleteResult } from "typeorm"

export default interface RepositoryInterface<T> {
  create(entity: T): Promise<any>
  update(entity: T, id: string): Promise<any>
  delete(id: string): Promise<DeleteResult>
  findById(id: string): Promise<any>
  findAll(): Promise<any[]>
  findWithRelations(relations: any): Promise<any[]>
}