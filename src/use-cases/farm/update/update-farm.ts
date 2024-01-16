import FarmAddress from "../../../domain/farm/value-object/farm-address";
import Farm from "../../../domain/farm/entity/farm.entity";
import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";
import ProducerRepositoryInterface from "../../../domain/producer/repository/producer.repository.interface";
import {
  InternalServerError,
  NotFoundError,
} from "../../../infrastructure/api/helpers/ApiErrors";
import FarmDto from "../../../infrastructure/api/farm/dto/farm.dto";

export default class UpdateFarm {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
    private readonly producerRepository: ProducerRepositoryInterface
  ) {}

  async execute(requestBody: FarmDto, farmId: string) {
    await this.validateProducer(requestBody);
    try {
      await this.buildCompleteFarm(requestBody, farmId);
      await this.farmRepository.update(requestBody, farmId);
      const farmUpdated = await this.farmRepository.findById(farmId);
      return farmUpdated;
    } catch (e: any) {
      console.log(e);
      throw new InternalServerError(e.toString());
    }
  }

  async validateProducer(requestBody: any) {
    if (requestBody.producerId) {
      const producer = await this.producerRepository.findById(
        requestBody.producerId
      );
      if (!producer) {
        throw new NotFoundError("Producer not found");
      }
    }
  }

  async buildCompleteFarm(requestBody: any, farmId: string) {
    const farmStored = await this.farmRepository.findById(farmId);
    if (!farmStored) {
      throw new NotFoundError("Farm not found");
    }

    const farmAddress = new FarmAddress(
      requestBody.city ?? farmStored.city,
      requestBody.state ?? farmStored.state
    );

    const farm = new Farm(
      requestBody.name ?? farmStored.name,
      farmAddress,
      requestBody.producerId ?? farmStored.producerId
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
