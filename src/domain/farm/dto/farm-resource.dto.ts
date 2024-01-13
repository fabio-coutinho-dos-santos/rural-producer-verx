import FarmEntity from "../../../infrastructure/database/typeorm/entities/farms.entity";
import Farm from "../entity/farm.entity";

export default class FarmResourceDto {
  constructor(farmStored: any) {

    let resourceArray = new Array<any>

    farmStored.map((farm: FarmEntity) => {
      let resource = {
        name: farm.name,
        address: {
          city: farm.city,
          state: farm.state,
        },
        areas: {
          total: farm.totalArea,
          arable: farm.arableArea,
          vegetation: farm.vegetationArea
        },
        crops: farm.crops
      }
      resourceArray.push(resource);
    })
    return resourceArray
  }
}