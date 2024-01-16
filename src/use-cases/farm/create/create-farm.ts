import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";
import Farm from "../../../domain/farm/entity/farm.entity";
import FarmAddress from "../../../domain/farm/value-object/farm-address";
import { BadRequestError } from "../../../infrastructure/api/helpers/ApiErrors";
import ProducerRepositoryInterface from "../../../domain/producer/repository/producer.repository.interface";
import FarmDto from "../../../infrastructure/api/farm/dto/farm.dto";
import customLogger from "../../../infrastructure/logger/pino.logger";

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
      const farmAddress = this.buildFarmAddress(requestBody);
      const farm = this.buildFarm(requestBody, farmAddress);
      const farmStored = await this.farmRepository.create(farm);
      return farmStored;
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError(String(e));
    }
  }

  private buildFarmAddress(requestBody: FarmDto): FarmAddress {
    const farmAddress = new FarmAddress(requestBody.city, requestBody.state);
    return farmAddress;
  }

  private buildFarm(requestBody: FarmDto, farmAddress: FarmAddress): Farm {
    const farm = new Farm(
      requestBody.name,
      farmAddress,
      requestBody.producerId
    );

    if (requestBody.crops) {
      requestBody.crops.map((crop: string) => {
        farm.addPlantedCrop(crop);
      });
    }

    if (requestBody.totalArea) {
      farm.changeTotalArea(requestBody.totalArea);
    }

    if (requestBody.arableArea) {
      farm.changeArableArea(requestBody.arableArea);
    }

    if (requestBody.vegetationArea) {
      farm.changeVegetationArea(requestBody.vegetationArea);
    }

    return farm;
  }
}
