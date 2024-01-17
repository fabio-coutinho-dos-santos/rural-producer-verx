import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  validateOrReject,
} from "class-validator";
import { ProducerConstants } from "../../../../domain/producer/enum/producer.constants.enum";
import { BadRequestError } from "../../helpers/ApiErrors";
import customLogger from "../../../logger/pino.logger";
import ProducerDto from "./producer.dto";

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

  async validate() {
    try {
      await validateOrReject(this);
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError("Invalid request body");
    }
  }
}
