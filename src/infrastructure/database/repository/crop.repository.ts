import { DataSource, Repository } from "typeorm";
import Farm from "../../../domain/farm/entity/farm.entity";
import CropRepositoryInterface from "../../../domain/crop/repository/crop.repository.interface";
import CropEntity from "../typeorm/entities/crop";
import Crop from "../../../domain/crop/entity/crop.entity";

export class CropRepository implements CropRepositoryInterface {

  private repository: Repository<CropEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(CropEntity);
  }
  
  findWithRelations(relations: any): Promise<Crop[]> {
    throw new Error("Method not implemented.");
  }

  async create(entity: any): Promise<any> {
    const author = await this.repository.save(entity);
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
    const author = await this.repository.findOneBy({ id: id });
    return author;
  }

  async findAll(): Promise<any> {
    return await this.repository.find();
  }

}