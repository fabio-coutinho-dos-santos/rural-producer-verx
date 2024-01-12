import { DataSource, Repository } from "typeorm";
import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";
import FarmEntity from "../typeorm/entities/farms.entity";
import Farm from "../../../domain/farm/entity/farm.entity";
import { PlantedCrops } from "../../../domain/crop/enum/planted-crops.enum";

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
      crops: entity.crops
    };
    const farm = await this.repository.save(farmModel);
    return farm;
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

  async findWithRelations(relations: any): Promise<any> {
    return await this.repository.find(relations);
  }

}