import CreateFarm from "../../../../use-cases/farm/create/create-farm";
import { Response, Request } from "express";
import FarmRepositoryInterface from "../../../../domain/farm/repository/farm.repository.interface";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../helpers/ApiErrors";
import ProducerRepositoryInterface from "../../../../domain/producer/repository/producer.repository.interface";
import HttpStatus from "http-status-codes";
import UpdateFarm from "../../../../use-cases/farm/update/update-farm";
import { DeleteResult } from "typeorm";
import { GetAmountFarms } from "../../../../use-cases/farm/find/get-amount-farms";
import { GetTotalAreaFarms } from "../../../../use-cases/farm/find/get-total-area-farms";
import FarmDto from "../dto/farm.dto";
import UpdateFarmDto from "../dto/update-farm.dto";
import FarmPresenter from "../presenter/farm.presenter";
export class FarmController {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
    private readonly producerRepository: ProducerRepositoryInterface
  ) {
    this.createFarm = this.createFarm.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAmount = this.getAmount.bind(this);
    this.getTotalArea = this.getTotalArea.bind(this);
  }

  async createFarm(request: Request, response: Response): Promise<unknown> {
    try {
      const requestBody = request.body;
      const farmDto = new FarmDto(requestBody);
      await farmDto.validate();
      const farm = new CreateFarm(this.farmRepository, this.producerRepository);
      const farmStored = await farm.execute(requestBody);
      return response.status(HttpStatus.CREATED).json(farmStored);
    } catch (e: any) {
      console.log(e);
      throw new BadRequestError(e.toString());
    }
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const farms: any = await this.farmRepository.findWithRelations({
        relations: { producer: true },
      });
      return response.status(HttpStatus.OK).json(new FarmPresenter(farms));
    } catch (e: any) {
      console.log(e);
      throw new BadRequestError(e.toString());
    }
  }

  async update(request: Request, response: Response): Promise<unknown> {
    try {
      const requestBody = request.body;
      const farmId = request.params.id;
      const updateFarmDto = new UpdateFarmDto(requestBody);
      await updateFarmDto.validate();
      const farm = new UpdateFarm(this.farmRepository, this.producerRepository);
      const farmStored = await farm.execute(requestBody, farmId);
      return response.status(HttpStatus.OK).json(farmStored);
    } catch (e: any) {
      console.log(e);
      throw new BadRequestError(e.toString());
    }
  }

  async delete(request: Request, response: Response): Promise<unknown> {
    const farmId = request.params.id;
    const farmStored = await this.farmRepository.findById(farmId);
    if (!farmStored) {
      throw new NotFoundError("Farm not found");
    }

    try {
      const result: DeleteResult = await this.farmRepository.delete(farmId);

      const affected = result.affected;
      let deleted = false;

      if (affected) {
        deleted = true ? affected.valueOf() > 0 : false;
      }

      if (deleted) {
        return response.status(HttpStatus.NO_CONTENT).send();
      }

      return response.status(HttpStatus.OK).send();
    } catch (e: any) {
      console.log(e);
      throw new InternalServerError(e.toString());
    }
  }

  async getAmount(request: Request, response: Response): Promise<unknown> {
    try {
      const amountFarms = await new GetAmountFarms(
        this.farmRepository
      ).execute();
      const result = {
        amountFarms: parseFloat(amountFarms.amount),
      };
      return response.status(HttpStatus.OK).json(result);
    } catch (e: any) {
      console.log(e);
      throw new InternalServerError(e.toString());
    }
  }

  async getTotalArea(request: Request, response: Response): Promise<unknown> {
    try {
      const totalArea = await new GetTotalAreaFarms(
        this.farmRepository
      ).execute();
      const result = {
        totalArea: parseFloat(totalArea.total.toFixed(2)),
      };
      return response.status(HttpStatus.OK).json(result);
    } catch (e: any) {
      console.log(e);
      throw new InternalServerError(e.toString());
    }
  }
}
