import 'express-async-errors'
import express from 'express'
import routes from './routes';
import { AppDataSource } from './infrastructure/database/typeorm/postgres/data-source';
import { httpError } from './middlewares/http-errors';

const port = 3000;

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json())
    app.use(routes)
    app.use(httpError)
    return app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  })