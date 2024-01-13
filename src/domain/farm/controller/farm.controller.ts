import CreateFarm from "../../../use-cases/farm/create-farm";
import { Response, Request } from "express";
import FarmRepositoryInterface from "../repository/farm.repository.interface";
import { BadRequestError, InternalServerError, NotFoundError } from "../../../helpers/ApiErrors";
import FarmDto from "../dto/farm.dto";
import ProducerRepositoryInterface from "../../producer/repository/producer.repository.interface";
import HttpStatus from 'http-status-codes'
import UpdateFarm from "../../../use-cases/farm/update-farm";
import UpdateFarmDto from "../dto/update-farm.dto";
import { DeleteResult } from "typeorm";
export class FarmController {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
    private readonly producerRepository: ProducerRepositoryInterface,
  ) {
    this.createFarm = this.createFarm.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
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
      const farms = await this.farmRepository.findWithRelations({ relations: { producer: true } })
      return response.status(HttpStatus.OK).json(farms);
    } catch (e: any) {
      console.log(e);
      throw new BadRequestError(e.toString())
    }
  }

  async update(request: Request, response: Response): Promise<unknown> {
    try {
      const requestBody = request.body
      const farmId = request.params.id
      const updateFarmDto = new UpdateFarmDto(requestBody);
      await updateFarmDto.validate();
      const farm = new UpdateFarm(this.farmRepository, this.producerRepository)
      const farmStored = await farm.execute(requestBody, farmId);
      return response.status(HttpStatus.OK).json(farmStored);
    } catch (e: any) {
      console.log(e);
      throw new BadRequestError(e.toString())
    }
  }

  async delete(request: Request, response: Response): Promise<unknown> {
    const farmId = request.params.id
    const farmStored = await this.farmRepository.findById(farmId);
    if (!farmStored) {
      throw new NotFoundError('Farm not found')
    }

    try {
      const result: DeleteResult = await this.farmRepository.delete(farmId)

      const affected = result.affected;
      let deleted = false;

      if (affected) {
        deleted = true ? affected.valueOf() > 0 : false
      }

      if (deleted) {
        return response.status(HttpStatus.NO_CONTENT).send();
      }

      return response.status(HttpStatus.OK).send();
    } catch (e: any) {
      console.log(e)
      throw new InternalServerError(e.toString())
    }
  }
}