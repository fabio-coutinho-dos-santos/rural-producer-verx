import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";
import { BadRequestError } from "../../../infrastructure/api/helpers/ApiErrors";
import ProducerRepositoryInterface from "../../../domain/producer/repository/producer.repository.interface";
import FarmDto from "../../../infrastructure/api/farm/dto/farm.dto";
import customLogger from "../../../infrastructure/logger/pino.logger";
import FarmFactory from "../../../domain/farm/factory/farm.factory";

export default class CreateFarm {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
    private readonly producerRepository: ProducerRepositoryInterface
  ) {}

  async execute(requestBody: FarmDto) {
    try {
      const producer = await this.producerRepository.findById(
        requestBody.producerId
      );
      if (!producer) {
        throw new BadRequestError("Producer not found");
      }
      const farm = new FarmFactory().create(requestBody);
      const farmStored = await this.farmRepository.create(farm);
      return farmStored;
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError(String(e));
    }
  }
}
