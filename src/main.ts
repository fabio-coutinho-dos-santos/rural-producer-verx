import 'express-async-errors'
import express from 'express'
import { AppDataSource } from './infrastructure/database/typeorm/postgres/data-source';
import { httpError } from './middlewares/http-errors';
import farmRoutes from './domain/farm/routes';
import producerRoutes from './domain/producer/routes';

const port = 3000;

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json())
    app.use(producerRoutes)
    app.use(farmRoutes)
    app.use(httpError)
    return app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  })