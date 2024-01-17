import { DeleteResult } from "typeorm";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../helpers/ApiErrors";
import Producer from "../../../../domain/producer/entity/producer.entity";
import ProducerRepositoryInterface from "../../../../domain/producer/repository/producer.repository.interface";
import { Response, Request } from "express";
import HttpStatus from "http-status-codes";
import UpdateProducer from "../../../../use-cases/producer/update/update-producer";
import ProducerDto from "../dto/producer.dto";
import UpdateProducerDto from "../dto/update-producer.dto";
import ArrayProducerPresenter from "../presenter/producer-all.presenter";
import ProducerResourcePresenter from "../presenter/producer.presenter";
import customLogger from "../../../logger/pino.logger";
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
      await producerDto.validate();
      const producer = new Producer(producerDto.name, producerDto.document);
      const producerStored = await this.producerRepository.create(producer);
      return response.status(HttpStatus.CREATED).json(producerStored);
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError(String(e));
    }
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const allProducers: any = await this.producerRepository.findWithRelations(
        {
          relations: { farms: true },
        }
      );
      return response
        .status(HttpStatus.OK)
        .json(new ArrayProducerPresenter(allProducers));
    } catch (e: unknown) {
      customLogger.error(e);
      throw new InternalServerError(String(e));
    }
  }

  async getById(request: Request, response: Response): Promise<unknown> {
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
    return response
      .status(HttpStatus.OK)
      .json(new ProducerResourcePresenter(producerStored));
  }

  async delete(request: Request, response: Response): Promise<unknown> {
    const producerId = request.params.id;
    const producerStored = await this.producerRepository.findById(producerId);
    if (!producerStored) {
      throw new NotFoundError("Producer not found");
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
      await updateFarmDto.validate();
      const producer = new UpdateProducer(this.producerRepository);
      const producerUpdated = await producer.execute(requestBody, producerId);
      return response.status(HttpStatus.OK).json(producerUpdated);
    } catch (e: unknown) {
      customLogger.error(e);
      throw new BadRequestError(String(e));
    }
  }
}
