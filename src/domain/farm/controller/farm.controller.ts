import CreateFarm from "../../../use-cases/farm/create-farm";
import { Response, Request } from "express";
import FarmRepositoryInterface from "../repository/farm.repository.interface";
import { BadRequestError, InternalServerError } from "../../../helpers/ApiErrors";
import FarmDto from "../dto/farm.dto";
import ProducerRepositoryInterface from "../../producer/repository/producer.repository.interface";
import HttpStatus from 'http-status-codes'
export class FarmController {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
    private readonly producerRepository: ProducerRepositoryInterface,
  ) {
    this.createFarm = this.createFarm.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async createFarm(request: Request, response: Response): Promise<unknown> {
    try {
      const requestBody = request.body
      const farmDto = new FarmDto(requestBody);
      await farmDto.validate();
      const farm = new CreateFarm(this.farmRepository, this.producerRepository)
      const farmStored = await farm.execute(requestBody);
      return response.status(HttpStatus.CREATED).json(farmStored);
    } catch (e: any) {
      console.log(e);
      throw new BadRequestError(e.toString())
    }
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const farms = await this.farmRepository.findWithRelations({relations:{producer: true}})
      return response.status(HttpStatus.OK).json(farms);
    } catch (e: any) {
      console.log(e);
      throw new BadRequestError(e.toString())
    }
  }
}