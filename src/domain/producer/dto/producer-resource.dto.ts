import ProducerEntity from "../../../infrastructure/database/typeorm/entities/producer.entity";
import FarmResourceDto from "../../farm/dto/farm-resource.dto";

export default class ProducerResourceDto {
  constructor(producerStored: ProducerEntity) {
    const resource = {
      name: producerStored.name,
      document: producerStored.document,      
      farms: new FarmResourceDto(producerStored.farms) ?? []
    }
    return resource
  }
}
