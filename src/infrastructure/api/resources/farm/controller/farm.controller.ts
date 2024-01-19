import { Response, Request } from "express";
import HttpStatus from "http-status-codes";
import { DeleteResult } from "typeorm";
import FarmDto from "../dto/farm.dto";
import UpdateFarmDto from "../dto/update-farm.dto";
import FarmPresenter from "../presenter/farm.presenter";
import FarmRepositoryInterface from "../../../../../domain/farm/repository/farm.repository.interface";
import ProducerRepositoryInterface from "../../../../../domain/producer/repository/producer.repository.interface";
import CreateFarm from "../../../../../use-cases/farm/create/create-farm";
import customLogger from "../../../../logger/pino.logger";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../../helpers/ApiErrors";
import UpdateFarm from "../../../../../use-cases/farm/update/update-farm";
import { GetAmountFarms } from "../../../../../use-cases/farm/find/get-amount-farms";
import { GetTotalAreaFarms } from "../../../../../use-cases/farm/find/get-total-area-farms";
import { GetFamsGroupedByState } from "../../../../../use-cases/farm/find/get-farms-by-state";
import { GetFamsGroupedByCrop } from "../../../../../use-cases/farm/find/get-farms-by-crops";
import { validateOrReject } from "class-validator";

export class FarmController {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
    private readonly producerRepository: ProducerRepositoryInterface
  ) {
    this.createFarm = this.createFarm.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getFarmTotals = this.getFarmTotals.bind(this);
  }

  async createFarm(request: Request, response: Response): Promise<unknown> {
    try {
      const requestBody = request.body;
      const farmDto = new FarmDto(requestBody);
      await validateOrReject(farmDto);
      const farm = new CreateFarm(this.farmRepository, this.producerRepository);
      const farmStored = await farm.execute(requestBody);
      return response.status(HttpStatus.CREATED).json(farmStored);
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError(String(e));
    }
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const farms: any = await this.farmRepository.findWithRelations({
        relations: { producer: true },
      });
      return response.status(HttpStatus.OK).json(new FarmPresenter(farms));
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError(String(e));
    }
  }

  async update(request: Request, response: Response): Promise<unknown> {
    try {
      const requestBody = request.body;
      const farmId = request.params.id;
      const updateFarmDto = new UpdateFarmDto(requestBody);
      await validateOrReject(updateFarmDto);
      const farm = new UpdateFarm(this.farmRepository, this.producerRepository);
      const farmStored = await farm.execute(requestBody, farmId);
      return response.status(HttpStatus.OK).json(farmStored);
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError(String(e));
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
        deleted = affected.valueOf() > 0;
      }

      if (deleted) {
        return response.status(HttpStatus.NO_CONTENT).send();
      }

      return response.status(HttpStatus.OK).send();
    } catch (e: unknown) {
      customLogger.error(e);
      throw new InternalServerError(String(e));
    }
  }

  async getFarmTotals(request: Request, response: Response): Promise<unknown> {
    try {
      const [amountFarms, areas, farmsByState, farmsByCrop] = await Promise.all(
        [
          new GetAmountFarms(this.farmRepository).execute(),
          new GetTotalAreaFarms(this.farmRepository).execute(),
          new GetFamsGroupedByState(this.farmRepository).execute(),
          new GetFamsGroupedByCrop(this.farmRepository).execute(),
        ]
      );

      const result = {
        amountFarms: parseFloat(amountFarms.amount),
        areas,
        farmsByState,
        farmsByCrop,
      };

      return response.status(HttpStatus.OK).json(result);
    } catch (e: unknown) {
      customLogger.error(e);
      throw new InternalServerError(String(e));
    }
  }
}
