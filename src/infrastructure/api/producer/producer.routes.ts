import { Router } from "express";
import ProducerController from "./controller/producer.controller";
import { getDataSource } from "../../database/config";
import { ProducerRepository } from "../../database/typeorm/repository/producer.repository";
import { API_CONFIG } from "../config";

const producerRoutes = Router();
const producerController = new ProducerController(
  new ProducerRepository(getDataSource())
);
producerRoutes.post(`/api/${API_CONFIG.version}/producers`, producerController.createProducer);
producerRoutes.get(`/api/${API_CONFIG.version}/producers`, producerController.getAll);
producerRoutes.get(`/api/${API_CONFIG.version}/producers/:id`, producerController.getById);
producerRoutes.patch(`/api/${API_CONFIG.version}/producers/:id`, producerController.update);
producerRoutes.delete(`/api/${API_CONFIG.version}/producers/:id`, producerController.delete);

export default producerRoutes;
