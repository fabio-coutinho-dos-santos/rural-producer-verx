import FarmEntity from "../../../database/typeorm/postgres/entities/farms.entity";

export default class ProducerFarmPresenter {
  constructor(farmStored: any) {
    const resourceArray = new Array<any>();

    farmStored.map((farm: FarmEntity) => {
      const resource = {
        id: farm.id,
        name: farm.name,
        address: {
          city: farm.city,
          state: farm.state,
        },
        areas: {
          total: farm.totalArea,
          arable: farm.arableArea,
          vegetation: farm.vegetationArea,
        },
        crops: farm.crops,
      };
      resourceArray.push(resource);
    });
    return resourceArray;
  }
}
