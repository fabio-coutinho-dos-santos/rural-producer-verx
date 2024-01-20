import Producer from "../../../domain/producer/entity/producer.entity";
import ProducerRepositoryInterface from "../../../domain/producer/repository/producer.repository.interface";
import { maskDocument } from "../../../infrastructure/api/helpers/mask-functions";
import ProducerDto from "../../../infrastructure/api/resources/producer/dto/producer.dto";
import ProducerEntity from "../../../infrastructure/database/typeorm/postgres/entities/producer.entity";

export class CreateProducer {
  constructor(
    private readonly producerRepository: ProducerRepositoryInterface
  ) {}

  async execute(input: ProducerDto) {
    const producer = new Producer(input.name, input.document);
    const producerStored: ProducerEntity =
        await this.producerRepository.create(producer);
      producerStored.document = maskDocument(producerStored.document);
    return producerStored;
  }
}
