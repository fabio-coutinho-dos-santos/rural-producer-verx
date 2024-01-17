import {
  IsNotEmpty,
  IsString,
  Length,
  validateOrReject,
} from "class-validator";
import { ProducerConstants } from "../../../../domain/producer/enum/producer.constants.enum";
import { BadRequestError } from "../../helpers/ApiErrors";
import customLogger from "../../../logger/pino.logger";

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

  async validate() {
    try {
      await validateOrReject(this);
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError("Invalid request body");
    }
  }
}
