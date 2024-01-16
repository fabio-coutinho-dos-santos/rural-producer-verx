import {
  DataSource,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from "typeorm";
import ProducerRepositoryInterface from "../../../../domain/producer/repository/producer.repository.interface";
import Producer from "../../../../domain/producer/entity/producer.entity";
import ProducerEntity from "../postgres/entities/producer.entity";

export class ProducerRepository implements ProducerRepositoryInterface {
  private repository: Repository<ProducerEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(ProducerEntity);
  }

  async findWithRelations(
    relations: FindManyOptions<ProducerEntity>
  ): Promise<ProducerEntity[]> {
    return await this.repository.find(relations);
  }

  async findOneWithRelations(
    relations: FindOneOptions<ProducerEntity>
  ): Promise<ProducerEntity | null> {
    return await this.repository.findOne(relations);
  }

  async create(entity: Producer): Promise<Producer> {
    const author = await this.repository.save(entity);
    return author;
  }

  async update(entity: Partial<Producer>, id: string): Promise<Producer | ProducerEntity | null> {
    await this.repository.update(id, entity);
    const producerUpdated = await this.repository.findOneBy({ id: id });
    return producerUpdated;
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async findById(id: string): Promise<ProducerEntity | null> {
    const producer = await this.repository.findOneBy({ id: id });
    return producer;
  }

  async findAll(): Promise<ProducerEntity[]> {
    return await this.repository.find();
  }
}