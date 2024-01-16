import ProducerEntity from "../../../database/typeorm/postgres/entities/producer.entity";
import ProducerFarmPresenter from "../../farm/presenter/producer-farm.presenter";

export default class ProducerResourcePresenter {
  constructor(producerStored: ProducerEntity) {
    const resource = {
      id: producerStored.id,
      name: producerStored.name,
      document: producerStored.document,
      farms: new ProducerFarmPresenter(producerStored.farms) ?? [],
    };
    return resource;
  }
}
