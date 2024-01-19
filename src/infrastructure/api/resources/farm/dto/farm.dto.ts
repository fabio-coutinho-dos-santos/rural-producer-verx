import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from "class-validator";
import { PlantedCrops } from "../../../../../domain/producer/enum/planted-crops.enum";

export default class FarmDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  producerId: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNumber()
  totalArea: number;

  @IsNumber()
  arableArea: number;

  @IsNumber()
  vegetationArea: number;

  @IsEnum(PlantedCrops, { each: true })
  crops: PlantedCrops[];

  constructor(requestBody: any) {
    this.name = requestBody.name;
    this.city = requestBody.city;
    this.state = requestBody.state;
    this.producerId = requestBody.producerId;
    this.totalArea = requestBody.totalArea ? requestBody.totalArea : 0;
    this.arableArea = requestBody.arableArea ? requestBody.arableArea : 0;
    this.vegetationArea = requestBody.vegetationArea
      ? requestBody.vegetationArea
      : 0;
    this.crops = requestBody.crops ? requestBody.crops : [];
  }
}
