import { Router } from "express";
import ProducerController from "./controller/producer.controller";
import { ProducerRepository } from "../../infrastructure/database/repository/producer.repository";
import { getDataSource } from "../../infrastructure/database/config";

const producerRoutes = Router();
const producerController = new ProducerController(new ProducerRepository(getDataSource()))
producerRoutes.post('/api/producers', producerController.createProducer)
producerRoutes.get('/api/producers', producerController.getAll)
producerRoutes.get('/api/producers/:id', producerController.getById)
producerRoutes.patch('/api/producers/:id', producerController.update)
producerRoutes.delete('/api/producers/:id', producerController.delete)

export default producerRoutes;