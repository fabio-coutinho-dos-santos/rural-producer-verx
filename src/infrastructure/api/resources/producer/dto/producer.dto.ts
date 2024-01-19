import { IsNotEmpty, IsString, Length } from "class-validator";
import { ProducerConstants } from "../../../../../domain/producer/enum/producer.constants.enum";

export default class ProducerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(ProducerConstants.SIZE_CPF)
  document: string;

  constructor(requestBody: any) {
    this.name = requestBody.name;
    this.document = requestBody.document;
  }
}
