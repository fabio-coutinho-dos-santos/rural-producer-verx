import FarmDto from "../../../infrastructure/api/farm/dto/farm.dto";
import Farm from "../entity/farm.entity";
import FarmAddress from "../value-object/farm-address";

export default class FarmFactory {
  public create(input: FarmDto) {
    const farmAddress = this.buildFarmAddress(input);
    const farm = this.buildFarm(input, farmAddress);
    return farm
  }

  private buildFarmAddress(input: FarmDto): FarmAddress {
    const farmAddress = new FarmAddress(input.city, input.state);
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