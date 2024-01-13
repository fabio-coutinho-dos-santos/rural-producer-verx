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
farmRoutes.post('/api/v1/farms', farmController.createFarm)
farmRoutes.get('/api/v1/farms', farmController.getAll)
farmRoutes.patch('/api/v1/farms/:id', farmController.update)
farmRoutes.delete('/api/v1/farms/:id', farmController.delete)
farmRoutes.get('/api/v1/farms/count', farmController.getAmount)
farmRoutes.get('/api/v1/farms/area/total', farmController.getTotalArea)

export default farmRoutes;