import Producer from "../../domain/producer/entity/producer.entity";
import ProducerRepositoryInterface from "../../domain/producer/repository/producer.repository.interface";
import { NotFoundError } from "../../helpers/ApiErrors";

export default class UpdateProducer {
  constructor(private readonly producerRepository: ProducerRepositoryInterface) { }

  async execute(requestBody: any, producerId: string) {

    await this.buildNewProducer(requestBody, producerId)
    await this.producerRepository.update(requestBody, producerId)
    const producerUpdated = this.producerRepository.findById(producerId)
    return producerUpdated;
  }

  async buildNewProducer(requestBody: any, producerId: string) {
    const producerStored = await this.producerRepository.findById(producerId)
    if (!producerStored) {
      throw new NotFoundError('Producer not found')
    }

    const newProducer = new Producer(
      requestBody.name ?? producerStored.name,
      requestBody.document ?? producerStored.document
    )

    return newProducer;
  }
}