import { IsNotEmpty, IsString, Length, ValidationError, validateOrReject } from "class-validator"
import { BadRequestError } from "../../../helpers/ApiErrors"
import { ProducerConstants } from "../enum/producer.constants.enum"

export default class ProducerDto {

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  @Length(ProducerConstants.SIZE_CPF, ProducerConstants.SIZE_CNPJ)
  document: string

  constructor(requestBody:any){
    this.name = requestBody.name
    this.document = requestBody.document
  }

  async validate() {
    try {
      await validateOrReject(this);
    } catch (e: ValidationError | any) {
      console.log(e);
      throw new BadRequestError("Invalid request body");
    }
  }
}