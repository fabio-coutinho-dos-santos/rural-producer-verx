import FarmEntity from "../../../database/typeorm/postgres/entities/farms.entity";

export default class FarmPresenter {
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
        producer: farm.producer.name,
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
