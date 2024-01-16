import "express-async-errors";
import express from "express";
import { AppDataSource } from "./infrastructure/database/typeorm/postgres/data-source";
import farmRoutes from "./infrastructure/api/farm/farm.routes";
import producerRoutes from "./infrastructure/api/producer/producer.routes";
import swaggerUI from "swagger-ui-express";
import * as YAML from "yamljs";
import { httpError } from "./infrastructure/api/middlewares/http-errors";

const port = 3000;

const swaggerDocument = YAML.load("./docs/api.yaml");
AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  app.use(producerRoutes);
  app.use(farmRoutes);
  app.use(httpError);
  app.use("/api/v1/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  return app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
