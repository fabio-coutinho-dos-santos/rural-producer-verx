import { DataSource, Repository } from "typeorm";
import FarmRepositoryInterface from "../../../../domain/farm/repository/farm.repository.interface";
import Farm from "../../../../domain/farm/entity/farm.entity";
import FarmEntity from "../postgres/entities/farms.entity";

export class FarmRepository implements FarmRepositoryInterface {
  private repository: Repository<FarmEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(FarmEntity);
  }

  async create(entity: Farm): Promise<any> {
    const farmModel = {
      name: entity.name,
      city: entity.address.city,
      state: entity.address.state,
      totalArea: entity.totalArea,
      arableArea: entity.arableArea,
      producerId: entity.producerId,
      vegetationArea: entity.vegetableArea,
      crops: entity.crops,
    };
    const farm = await this.repository.save(farmModel);
    return farm;
  }

  async update(entity: any | Partial<Farm>, id: string): Promise<any> {
    await this.repository.update(id, entity);
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

  async findWithRelations(relations: any): Promise<any> {
    return await this.repository.find(relations);
  }

  async getAmountFarms(): Promise<any> {
    const result: any = await this.repository
      .createQueryBuilder("farm")
      .select("COUNT(farm.id) as amount")
      .getRawOne();
    return Promise.resolve(result);
  }

  async getTotalArea(): Promise<any> {
    const result: any = await this.repository
      .createQueryBuilder("farm")
      .select("SUM(farm.totalArea) as total")
      .getRawOne();
    return Promise.resolve(result);
  }
}
