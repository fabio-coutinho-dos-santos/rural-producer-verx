import ProducerEntity from "../../../../database/typeorm/postgres/entities/producer.entity";
import { maskDocument } from "../../../helpers/mask-functions";
import ProducerFarmPresenter from "../../farm/presenter/producer-farm.presenter";

export default class ProducerResourcePresenter {
  constructor(producerStored: ProducerEntity) {
    const resource = {
      id: producerStored.id,
      name: producerStored.name,
      document: maskDocument(producerStored.document),
      farms: new ProducerFarmPresenter(producerStored.farms) ?? [],
    };
    return resource;
  }
}
