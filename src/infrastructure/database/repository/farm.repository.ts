import { DataSource, Repository } from "typeorm";
import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";
import FarmEntity from "../typeorm/entities/farms.entity";
import Farm from "../../../domain/farm/entity/farm.entity";

export class FarmRepository implements FarmRepositoryInterface {

  private repository: Repository<FarmEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(FarmEntity);
  }

  async create(entity: any): Promise<any> {  
   const author =  await this.repository.save(entity);
    return author;
  }

  async update(entity: any | Partial<Farm>, id: string): Promise<any> {
    await this.repository.update(id, entity)
    return await this.findById(id);
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async findById(id: any): Promise<any> {
    const author = await this.repository.findOneBy({id: id});
    return author;
  }

  async findAll(): Promise<any> {
    return await this.repository.find();
  }

}