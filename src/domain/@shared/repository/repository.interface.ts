import { DeleteResult } from "typeorm";

export default interface RepositoryInterface<T> {
  update(entity: T, id: string): Promise<T | null>;
  delete(id: string): Promise<DeleteResult>;
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  findWithRelations(relations: unknown): Promise<T[]>;
  findOneWithRelations(relations: unknown): Promise<T | null>;
  count(): Promise<number>
}
