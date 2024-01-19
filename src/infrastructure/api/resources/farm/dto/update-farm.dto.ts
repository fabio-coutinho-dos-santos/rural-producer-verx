import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { PlantedCrops } from "../../../../../domain/producer/enum/planted-crops.enum";
import FarmEntity from "../../../../database/typeorm/postgres/entities/farms.entity";

export default class UpdateFarmDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsUUID()
  producerId: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  state: string;

  @IsNumber()
  @IsOptional()
  totalArea: number;

  @IsNumber()
  @IsOptional()
  arableArea: number;

  @IsNumber()
  @IsOptional()
  vegetationArea: number;

  @IsEnum(PlantedCrops, { each: true })
  @IsOptional()
  crops: PlantedCrops[];

  constructor(requestBody: FarmEntity) {
    if (requestBody.name) this.name = requestBody.name;
    if (requestBody.city) this.city = requestBody.city;
    if (requestBody.state) this.state = requestBody.state;
    if (requestBody.producerId) this.producerId = requestBody.producerId;
    if (requestBody.totalArea) this.totalArea = requestBody.totalArea;
    if (requestBody.arableArea) this.arableArea = requestBody.arableArea;
    if (requestBody.vegetationArea)
      this.vegetationArea = requestBody.vegetationArea;
    if (requestBody.crops) this.crops = requestBody.crops;
  }
}
