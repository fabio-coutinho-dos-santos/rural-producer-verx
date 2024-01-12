import { Router } from "express";
import ProducerController from "./domain/producer/controller/producer.controller";
import { AppDataSource } from "./infrastructure/database/typeorm/postgres/data-source";
import { ProducerRepository } from "./infrastructure/database/repository/producer.repository";
import { getDataSource } from "./infrastructure/database/config";

const routes = Router();
const producerController = new ProducerController(new ProducerRepository(getDataSource()))
routes.post('/api/producers', producerController.createProducer)
routes.get('/api/producers', producerController.getAll)
routes.get('/api/producers/:id', producerController.getById)
routes.delete('/api/producers/:id', producerController.delete)

export default routes;