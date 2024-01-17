import { DataSource, DeleteResult, FindManyOptions, Repository } from "typeorm";
import FarmRepositoryInterface, {
  AmountFarms,
  AreaTotalFarms,
} from "../../../../domain/farm/repository/farm.repository.interface";
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

  async update(
    entity: Partial<Farm>,
    id: string
  ): Promise<Farm | FarmEntity | null> {
    await this.repository.update(id, entity);
    return await this.findById(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async findById(id: string): Promise<FarmEntity | null> {
    const author = await this.repository.findOneBy({ id: id });
    return author;
  }

  async findAll(): Promise<FarmEntity[]> {
    return await this.repository.find();
  }

  async findWithRelations(
    relations: FindManyOptions<FarmEntity>
  ): Promise<FarmEntity[]> {
    return await this.repository.find(relations);
  }

  async getAmountFarms(): Promise<AmountFarms> {
    const result = await this.repository
      .createQueryBuilder("farm")
      .select("COUNT(farm.id) as amount")
      .getRawOne();
    return Promise.resolve(result);
  }

  async getTotalArea(): Promise<AreaTotalFarms> {
    const result = await this.repository
      .createQueryBuilder("farm")
      .select("SUM(farm.totalArea) as total")
      .getRawOne();
    return Promise.resolve(result);
  }
}
