import { Router } from "express";
import { FarmController } from "./controller/farm.controller";
import { getDataSource } from "../../../database/config";
import { FarmRepository } from "../../../database/typeorm/repository/farm.repository";
import { ProducerRepository } from "../../../database/typeorm/repository/producer.repository";
import { API_CONFIG } from "../../config";


const farmRoutes = Router();

const farmController = new FarmController(
  new FarmRepository(getDataSource()),
  new ProducerRepository(getDataSource())
);
farmRoutes.post(`/api/${API_CONFIG.version}/farms`, farmController.createFarm);
farmRoutes.get(`/api/${API_CONFIG.version}/farms`, farmController.getAll);
farmRoutes.patch(`/api/${API_CONFIG.version}/farms/:id`, farmController.update);
farmRoutes.delete(`/api/${API_CONFIG.version}/farms/:id`, farmController.delete);
farmRoutes.get(`/api/${API_CONFIG.version}/farms/totals`, farmController.getFarmTotals);

export default farmRoutes;
