import { DeleteResult } from "typeorm";
import { BadRequestError, InternalServerError, NotFoundError } from "../../../helpers/ApiErrors";
import ProducerDto from "../dto/producer.dto";
import Producer from "../entity/producer.entity";
import ProducerRepositoryInterface from "../repository/producer.repository.interface";
import { Response, Request } from "express";
import HttpStatus from 'http-status-codes';
export default class ProducerController {

  constructor(private readonly producerRepository: ProducerRepositoryInterface) {
    this.createProducer = this.createProducer.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
  }

  async createProducer(request: Request, response: Response): Promise<unknown> {
    try {
      const producerDto: ProducerDto = new ProducerDto(request.body)
      await producerDto.validate();
      const producer = new Producer(producerDto.name, producerDto.document)
      const producerStored = await this.producerRepository.create(producer);
      return response.status(HttpStatus.CREATED).json(producerStored)
    } catch (e: any) {
      console.log(e.toString());
      throw new BadRequestError(e)
    }
  }

  async getAll(request: Request, response: Response): Promise<unknown> {
    try {
      const allProducers = await this.producerRepository.findAll()
      return response.status(HttpStatus.OK).json(allProducers)
    } catch (e: any) {
      console.log(e.toString());
      throw new InternalServerError(e.toString())
    }
  }

  async getById(request: Request, response: Response): Promise<any> {
    const producerId = request.params.id;
    const producerStored = await this.producerRepository.findWithRelations({
      where: {
        id: producerId,
      },
      relations: {
        farms: true,
      },
    });
    if (!producerStored) {
      throw new NotFoundError('Producer not found')
    }
    return response.status(HttpStatus.OK).json(producerStored)
  }

  async delete(request: Request, response: Response): Promise<any> {
    const producerId = request.params.id
    const producerStored = await this.producerRepository.findById(producerId);
    if (!producerStored) {
      throw new NotFoundError('Producer not found')
    }

    try {
      const result: DeleteResult = await this.producerRepository.delete(producerId)

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