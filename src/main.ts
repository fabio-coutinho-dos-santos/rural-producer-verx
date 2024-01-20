import "express-async-errors";
import express from "express";
import { AppDataSource } from "./infrastructure/database/typeorm/postgres/datasources/data-source";
import swaggerUI from "swagger-ui-express";
import * as YAML from "yamljs";
import { httpError } from "./infrastructure/api/middlewares/http-errors";
import { API_CONFIG } from "./infrastructure/api/config";
import logger from "./infrastructure/logger/pino.logger";
import producerRoutes from "./infrastructure/api/resources/producer/producer.routes";
import farmRoutes from "./infrastructure/api/resources/farm/farm.routes";
import { corsOptions } from "./infrastructure/api/helpers/cors-options";
import cors from 'cors'

const port = API_CONFIG.port;

const swaggerDocument = YAML.load("./docs/api.yaml");
AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  app.use(producerRoutes);
  app.use(farmRoutes);
  app.use(httpError);
  app.use(cors(corsOptions))
  app.use(
    `/api/${API_CONFIG.version}/doc`,
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument)
  );

  return app.listen(port, () => {
    logger.info(`App listening on port ${port}`);
  });
});
