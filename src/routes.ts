import { Router } from "express";
import ProducerController from "./domain/producer/controller/producer.controller";
import { ProducerRepository } from "./infrastructure/database/repository/producer.repository";
import { getDataSource } from "./infrastructure/database/config";
import { FarmController } from "./domain/farm/controller/farm.controller";
import { FarmRepository } from "./infrastructure/database/repository/farm.repository";

const routes = Router();
const producerController = new ProducerController(new ProducerRepository(getDataSource()))
routes.post('/api/producers', producerController.createProducer)
routes.get('/api/producers', producerController.getAll)
routes.get('/api/producers/:id', producerController.getById)
routes.delete('/api/producers/:id', producerController.delete)

const farmController = new FarmController(
  new FarmRepository(getDataSource()),
  new ProducerRepository(getDataSource())
)
routes.post('/api/farms', farmController.createProducer)

export default routes;