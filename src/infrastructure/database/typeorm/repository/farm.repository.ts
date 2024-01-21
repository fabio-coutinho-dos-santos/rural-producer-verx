import {
  DataSource,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from "typeorm";
import FarmRepositoryInterface, {
  AmountFarms,
  AreaTotalFarms,
  FarmsByCrop,
  FarmsByState,
} from "../../../../domain/farm/repository/farm.repository.interface";
import Farm from "../../../../domain/farm/entity/farm.entity";
import FarmEntity from "../postgres/entities/farms.entity";

export class FarmRepository implements FarmRepositoryInterface {
  private repository: Repository<FarmEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(FarmEntity);
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }

  async findOneWithRelations(
    relations: FindOneOptions<FarmEntity>
  ): Promise<FarmEntity | null> {
    return await this.repository.findOne(relations);
  }

  async create(entity: Farm): Promise<FarmEntity> {
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
    entity: Partial<FarmEntity>,
    id: string
  ): Promise<FarmEntity | null> {
    await this.repository.update(id, entity);
    return await this.findById(id);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async findById(id: string): Promise<FarmEntity> {
    const farm = await this.repository.findOneOrFail({ where: { id: id } });
    return farm;
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
      .select(
        "SUM(farm.totalArea) as total, SUM(farm.arableArea) as arable, SUM(farm.vegetationArea) as vegetation"
      )
      .getRawOne();

    result.total = result.total ? parseFloat(result.total.toFixed(2)) : 0;
    result.arable = result.arable ? parseFloat(result.arable.toFixed(2)) : 0;
    result.vegetation = result.vegetation
      ? parseFloat(result.vegetation.toFixed(2))
      : 0;
    return Promise.resolve(result);
  }

  async getByState(): Promise<FarmsByState[]> {
    const results = await this.repository
      .createQueryBuilder("farm")
      .select("COUNT(*)::integer as amount, state")
      .groupBy("state")
      .getRawMany();
    return Promise.resolve(results);
  }

  async getByCrop(): Promise<FarmsByCrop[]> {
    const results = await this.repository
      .createQueryBuilder("farm")
      .select("UNNEST(string_to_array(farm.crops, ','))", "crop")
      .addSelect("COUNT(farm.id)::integer", "amount")
      .groupBy("crop")
      .getRawMany();
    return Promise.resolve(results);
  }
}
