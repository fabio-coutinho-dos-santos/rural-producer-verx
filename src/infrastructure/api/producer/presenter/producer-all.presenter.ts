import Producer from "../../../../domain/producer/entity/producer.entity";
import ProducerEntity from "../../../database/typeorm/postgres/entities/producer.entity";
import ProducerFarmPresenter from "../../farm/presenter/producer-farm.presenter";
import { maskDocument } from "../../helpers/mask-functions";
import ProducerResourcePresenter from "./producer.presenter";

export default class ArrayProducerPresenter {
  constructor(producers: ProducerEntity[] | Producer[]) {
    const arrayProducers = new Array<ProducerResourcePresenter>();
    producers.forEach((producer: any) => {
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