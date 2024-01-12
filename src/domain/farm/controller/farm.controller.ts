import CreateFarm from "../../../use-cases/farm/create-farm";
import { Response, Request } from "express";
import FarmRepositoryInterface from "../repository/farm.repository.interface";
import { InternalServerError } from "../../../helpers/ApiErrors";
import FarmDto from "../dto/farm.dto";

export class FarmController {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
  ) {
    this.createProducer = this.createProducer.bind(this);
  }

  async createProducer(request: Request, response: Response): Promise<unknown> {
    try {
      const requestBody = request.body
      const farmDto = new FarmDto(requestBody);
      await farmDto.validate();
      const farm = new CreateFarm(this.farmRepository)
      const farmStored = await farm.execute(requestBody);
      console.log(farmStored)
      return response.status(201).json(farmStored);
    } catch (e: any) {
      console.log(e);
      throw new InternalServerError(e.toString())
    }

  }
}