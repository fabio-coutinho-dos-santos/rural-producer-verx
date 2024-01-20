import { DeleteResult } from "typeorm";
import { Response, Request } from "express";
import HttpStatus from "http-status-codes";
import ProducerDto from "../dto/producer.dto";
import UpdateProducerDto from "../dto/update-producer.dto";
import ProducerResourcePresenter from "../presenter/producer.presenter";
import ProducerRepositoryInterface from "../../../../../domain/producer/repository/producer.repository.interface";
import { maskDocument } from "../../../helpers/mask-functions";
import customLogger from "../../../../logger/pino.logger";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../../helpers/ApiErrors";
import UpdateProducer from "../../../../../use-cases/producer/update/update-producer";
import { validateOrReject } from "class-validator";
import { CreateProducer } from "../../../../../use-cases/producer/create/create-producer";
import { GetAllProducer } from "../../../../../use-cases/producer/find/get-all-producers";
import { GetProducerById } from "../../../../../use-cases/producer/find/get-producer-by-id";

export default class ProducerController {
  constructor(
    private readonly producerRepository: ProducerRepositoryInterface
  ) {
    this.createProducer = this.createProducer.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async createProducer(request: Request, response: Response): Promise<unknown> {
    try {
      const producerDto: ProducerDto = new ProducerDto(request.body);
      await validateOrReject(producerDto);
      const producerStored = await new CreateProducer(
        this.producerRepository
      ).execute(producerDto);
      return response.status(HttpStatus.CREATED).json(producerStored);
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError(String(e));
    }
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const page: number = parseInt(request.query.page as string) || 1;
      const pageSize: number = parseInt(request.query.pageSize as string) || 10;
      const allProducersPaginated = await new GetAllProducer(
        this.producerRepository
      ).execute(page, pageSize);
      return response.status(HttpStatus.OK).json(allProducersPaginated);
    } catch (e: unknown) {
      customLogger.error(e);
      throw new InternalServerError(String(e));
    }
  }

  async getById(request: Request, response: Response): Promise<unknown> {
    const producerId = request.params.id;

    const producerStored = await new GetProducerById(
      this.producerRepository
    ).execute(producerId);

    if (!producerStored) {
      throw new NotFoundError("Producer not found");
    }

    return response
      .status(HttpStatus.OK)
      .json(new ProducerResourcePresenter(producerStored));
  }

  async delete(request: Request, response: Response): Promise<unknown> {
    const producerId = request.params.id;
    const producerStored = await this.producerRepository.findOneWithRelations({
      where: {
        id: producerId,
      },
      relations: {
        farms: true,
      },
    });

    if (!producerStored) {
      throw new NotFoundError("Producer not found");
    }

    if (producerStored.farms.length > 0) {
      throw new BadRequestError(
        "This producer is linked to farms and cannot be excluded"
      );
    }

    try {
      const result: DeleteResult = await this.producerRepository.delete(
        producerId
      );

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

  async update(request: Request, response: Response): Promise<unknown> {
    try {
      const requestBody = request.body;
      const producerId = request.params.id;
      const updateFarmDto = new UpdateProducerDto(requestBody);
      await validateOrReject(updateFarmDto);
      const producer = new UpdateProducer(this.producerRepository);
      const producerUpdated = await producer.execute(requestBody, producerId);
      if (producerUpdated?.document) {
        producerUpdated.document = maskDocument(producerUpdated.document);
      }
      return response.status(HttpStatus.OK).json(producerUpdated);
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError(String(e));
    }
  }
}
