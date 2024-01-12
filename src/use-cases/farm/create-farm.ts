import FarmRepositoryInterface from "../../domain/farm/repository/farm.repository.interface";
import Farm from "../../domain/farm/entity/farm.entity";
import FarmAddress from "../../domain/farm/entity/farm-address.entity";
import { BadRequestError } from "../../helpers/ApiErrors";

export default class CreateFarm {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
  ) { }

  async execute(requestBody: any) {
    try {
      const farmAddress = this.buildFarmAddress(requestBody);
      const farm = this.buildFarm(requestBody, farmAddress);
      const farmStored = await this.farmRepository.create(farm);
      return farmStored
    } catch (e: any) {
      console.log(e)
      throw new BadRequestError(e.toString());
    }
  }

  private buildFarmAddress(requestBody: any): FarmAddress {
    const farmAddress = new FarmAddress(
      requestBody.city,
      requestBody.state
    )
    return farmAddress;
  }

  private buildFarm(requestBody: any, farmAddress: FarmAddress): Farm {
    const farm = new Farm(
      requestBody.name,
      farmAddress,
    );

    if(requestBody.crops) {
      requestBody.crops.map((crop: string) => {
        farm.addPlantedCrop(crop)
      });
    }

    if(requestBody.totalArea) {
      farm.changeTotalArea(requestBody.totalArea)
    }

    if(requestBody.arableArea) {
      farm.changeArableArea(requestBody.arableArea)
    }

    if(requestBody.vegetationArea) {
      farm.changeVegetationArea(requestBody.vegetationArea)
    }

    return farm
  }
}