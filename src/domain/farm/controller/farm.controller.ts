import { CropRepository } from "../../../infrastructure/database/repository/crop.repository";
import CreateFarm from "../../../use-cases/farm/create-farm";
import FarmRepositoryInterface from "../repository/farm.repository.interface";
import { Response, Request } from "express";

export class FarmController {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
    private readonly cropRepository: CropRepository
  ) {
    this.createProducer = this.createProducer.bind(this);
  }

  async createProducer(request: Request, response: Response): Promise<unknown> {
    const requestBody = request.body
    const farm = new CreateFarm(
      this.farmRepository,
      this.cropRepository,
    )
    farm.execute();
    console.log(requestBody)
    return response.status(200).send()
  }
}