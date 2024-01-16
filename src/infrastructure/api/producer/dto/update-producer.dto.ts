import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  validateOrReject,
} from "class-validator";
import { ProducerConstants } from "../../../../domain/producer/enum/producer.constants.enum";
import { BadRequestError } from "../../helpers/ApiErrors";

export default class UpdateProducerDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(ProducerConstants.SIZE_CPF, ProducerConstants.SIZE_CNPJ)
  document: string;

  constructor(requestBody: any) {
    if (requestBody.name) this.name = requestBody.name;
    if (requestBody.document) this.name = requestBody.document;
  }

  async validate() {
    try {
      await validateOrReject(this);
    } catch (e: any) {
      console.log(e);
      throw new BadRequestError("Invalid request body");
    }
  }
}
