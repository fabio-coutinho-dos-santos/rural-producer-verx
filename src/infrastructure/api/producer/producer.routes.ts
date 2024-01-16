import { Router } from "express";
import ProducerController from "./controller/producer.controller";
import { getDataSource } from "../../database/config";
import { ProducerRepository } from "../../database/typeorm/repository/producer.repository";

const producerRoutes = Router();
const producerController = new ProducerController(
  new ProducerRepository(getDataSource())
);
producerRoutes.post("/api/v1/producers", producerController.createProducer);
producerRoutes.get("/api/v1/producers", producerController.getAll);
producerRoutes.get("/api/v1/producers/:id", producerController.getById);
producerRoutes.patch("/api/v1/producers/:id", producerController.update);
producerRoutes.delete("/api/v1/producers/:id", producerController.delete);

export default producerRoutes;
