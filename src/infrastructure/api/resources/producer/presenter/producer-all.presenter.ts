import ProducerEntity from "../../../../database/typeorm/postgres/entities/producer.entity";
import { maskDocument } from "../../../helpers/mask-functions";
import ProducerFarmPresenter from "../../farm/presenter/producer-farm.presenter";
import ProducerResourcePresenter from "./producer.presenter";

export default class ArrayProducerPresenter {
  constructor(producers: ProducerEntity[]) {
    const arrayProducers = new Array<ProducerResourcePresenter>();
    producers.forEach((producer: ProducerEntity) => {
      const resource = {
        id: producer.id,
        name: producer.name,
        document: maskDocument(producer.document),
        farms: new ProducerFarmPresenter(producer.farms),
      };
      arrayProducers.push(resource);
    });

    return arrayProducers;
  }
}
