import ProducerEntity from "../../../infrastructure/database/typeorm/entities/producer.entity";
import FarmResourceDto from "../../farm/dto/farm-resource.dto";
import ProducerResourceDto from "./producer-resource.dto";

export default class ArrayProducerResourceDto {
  constructor(producers: ProducerEntity[]) {
    let arrayProducers = new Array<ProducerResourceDto>
    producers.forEach((producer: any) => {
      let resource = {
        name: producer.name,
        document: producer.document,
        farms: new FarmResourceDto(producer.farms)
      }
      arrayProducers.push(resource)
    })

    return arrayProducers
  }
}
