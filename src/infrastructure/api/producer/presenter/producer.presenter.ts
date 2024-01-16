import ProducerEntity from "../../../database/typeorm/postgres/entities/producer.entity";
import FarmPresenter from "../../farm/presenter/farm.presenter";

export default class ProducerResourcePresenter {
  constructor(producerStored: ProducerEntity) {
    const resource = {
      id: producerStored.id,
      name: producerStored.name,
      document: producerStored.document,
      farms: new FarmPresenter(producerStored.farms) ?? [],
    };
    return resource;
  }
}
