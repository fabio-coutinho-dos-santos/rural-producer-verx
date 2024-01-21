import FarmEntity from "../../../../database/typeorm/postgres/entities/farms.entity";

export default class ProducerFarmPresenter {
  constructor(farmStored: FarmEntity[]) {
    const resourceArray = new Array<FarmToPresenter>();

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

export type FarmToPresenter = {
  id: string;
  name: string;
  address: {
    city: string;
    state: string;
  };
  areas: {
    total: number;
    arable: number;
    vegetation: number;
  };
  crops: string[];
};
