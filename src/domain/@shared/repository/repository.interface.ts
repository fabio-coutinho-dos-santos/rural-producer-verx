import { DeleteResult } from "typeorm";

export default interface RepositoryInterface<T> {
  create(entity: T): Promise<T>;
  update(entity: unknown, id: string): Promise<any>;
  delete(id: string): Promise<DeleteResult>;
  findById(id: string): Promise<any>;
  findAll(): Promise<unknown[]>;
  findWithRelations(relations: unknown): Promise<T[] | unknown[]>;
}
