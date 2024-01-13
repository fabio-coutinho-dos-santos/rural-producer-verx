import { Router } from "express";
import { FarmController } from "./controller/farm.controller";
import { getDataSource } from "../../infrastructure/database/config";
import { FarmRepository } from "../../infrastructure/database/repository/farm.repository";
import { ProducerRepository } from "../../infrastructure/database/repository/producer.repository";

const farmRoutes = Router()

const farmController = new FarmController(
  new FarmRepository(getDataSource()),
  new ProducerRepository(getDataSource())
)
farmRoutes.post('/api/farms', farmController.createFarm)
farmRoutes.get('/api/farms', farmController.getAll)
farmRoutes.patch('/api/farms/:id', farmController.update)
farmRoutes.delete('/api/farms/:id', farmController.delete)

export default farmRoutes;