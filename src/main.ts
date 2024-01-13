import 'express-async-errors'
import express from 'express'
import { AppDataSource } from './infrastructure/database/typeorm/postgres/data-source';
import { httpError } from './middlewares/http-errors';
import farmRoutes from './domain/farm/routes';
import producerRoutes from './domain/producer/routes';
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import * as YAML from 'yamljs';

const port = 3000;

const swaggerDocument = YAML.load('./docs/api.yaml');
AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json())
    app.use(producerRoutes)
    app.use(farmRoutes)
    app.use(httpError)
    app.use("/api/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    return app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  })