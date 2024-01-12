import FarmRepositoryInterface from "../repository/farm.repository.interface";
import { Response, Request } from "express";

export class FarmController {
  constructor(private readonly farmRepository: FarmRepositoryInterface) {
    this.createProducer = this.createProducer.bind(this);
  }

  async createProducer(request: Request, response: Response): Promise<unknown> {
    const requestBody = request.body
    console.log(requestBody)
    return response.status(200).send()
  }
}