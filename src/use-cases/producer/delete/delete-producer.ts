import { DeleteResult } from "typeorm";
import ProducerRepositoryInterface from "../../../domain/producer/repository/producer.repository.interface";
import {
  BadRequestError,
  NotFoundError,
} from "../../../infrastructure/api/helpers/ApiErrors";

export class DeleteProducer {
  constructor(
    private readonly producerRepository: ProducerRepositoryInterface
  ) {}

  async execute(producerId: string) {
    const producerStored = await this.producerRepository.findOneWithRelations({
      where: {
        id: producerId,
      },
      relations: {
        farms: true,
      },
    });

    if (!producerStored) {
      throw new NotFoundError("Producer not found");
    }

    if (producerStored.farms.length > 0) {
      throw new BadRequestError(
        "This producer is linked to farms and cannot be excluded"
      );
    }

    const result: DeleteResult = await this.producerRepository.delete(
      producerId
    );

    const affected = result.affected;
    let deleted = false;

    if (affected) {
      deleted = affected.valueOf() > 0;
    }

    return deleted;
  }
}
