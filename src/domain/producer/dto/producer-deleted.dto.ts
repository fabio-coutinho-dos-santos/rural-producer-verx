import { IsBoolean, IsNotEmpty, IsString, Length, ValidationError, validateOrReject } from "class-validator"

export default class ProducerDto {

  @IsNotEmpty()
  @IsBoolean()
  deleted: boolean

  @IsNotEmpty()
  @IsString()
  id: string

  constructor(id: string, result: boolean){
    this.id = id
    this.deleted = result
  }
}