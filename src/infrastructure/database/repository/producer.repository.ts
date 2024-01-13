import { DataSource, Repository } from "typeorm";
import ProducerRepositoryInterface from "../../../domain/producer/repository/producer.repository.interface";
import Producer from "../typeorm/entities/farms.entity";
import ProducerEntity from "../typeorm/entities/producer.entity";

export class ProducerRepository implements ProducerRepositoryInterface {

  private repository: Repository<ProducerEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(ProducerEntity);
  }

  async findWithRelations(relations: any): Promise<any> {
    return await this.repository.findOne(relations);
  }

  async create(entity: any): Promise<any> {
    const author = await this.repository.save(entity);
    return author;
  }

  async update(entity: any | Partial<Producer>, id: string): Promise<any> {
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