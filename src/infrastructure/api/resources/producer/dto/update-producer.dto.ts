import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import ProducerDto from "./producer.dto";
import { ProducerConstants } from "../../../../../domain/producer/enum/producer.constants.enum";

export default class UpdateProducerDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(ProducerConstants.SIZE_CPF)
  document: string;

  constructor(requestBody: ProducerDto) {
    if (requestBody.name) this.name = requestBody.name;
    if (requestBody.document) this.name = requestBody.document;
  }
}
