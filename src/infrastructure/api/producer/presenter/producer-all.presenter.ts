import ProducerEntity from "../../../database/typeorm/postgres/entities/producer.entity";
import FarmResourceDto from "../../farm/presenter/farm.presenter";
import ProducerResourceDto from "./producer.precenter";

export default class ArrayProducerPresenter {
  constructor(producers: ProducerEntity[]) {
    let arrayProducers = new Array<ProducerResourceDto>
    producers.forEach((producer: any) => {
      let resource = {
        id: producer.id,
        name: producer.name,
        document: producer.document,
        farms: new FarmResourceDto(producer.farms)
      }
      arrayProducers.push(resource)
    })

    return arrayProducers
  }
}
