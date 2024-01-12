import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidationError, validateOrReject } from "class-validator"
import { BadRequestError } from "../../../helpers/ApiErrors"
import { PlantedCrops } from "../../crop/enum/planted-crops.enum"

export default class FarmDto {

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  city: string

  @IsNotEmpty()
  @IsString()
  state: string

  @IsNumber()
  totalArea: number

  @IsNumber()
  arableArea: number

  @IsNumber()
  vegetationArea: number

  @IsEnum(PlantedCrops, { each: true })
  crops: PlantedCrops[]

  constructor(requestBody: any) {
    this.name = requestBody.name
    this.city = requestBody.city
    this.state = requestBody.state
    this.totalArea = requestBody.totalArea ? requestBody.totalArea : 0
    this.arableArea = requestBody.arableArea ? requestBody.arableArea : 0
    this.vegetationArea = requestBody.vegetationArea ? requestBody.vegetationArea : 0
    this.crops = requestBody.crops ? requestBody.crops : []
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