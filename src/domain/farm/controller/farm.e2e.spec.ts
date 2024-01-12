import 'express-async-errors'
import express from 'express'
import supertest from 'supertest'
import routes from "../../../routes";
import { httpError } from '../../../middlewares/http-errors';
import { AppDataSourceTest } from '../../../infrastructure/database/typeorm/postgres/data-source-test';
import HttpStatus from 'http-status-codes'
import FarmEntity from '../../../infrastructure/database/typeorm/entities/farms.entity';

describe('Farms routes tests', () => {

  const app = express();
  app.use(express.json())
  app.use(httpError)
  app.use(routes)

  beforeAll(async () => {
    await AppDataSourceTest.initialize();
    // const repository = AppDataSourceTest.getRepository(FarmEntity);
    // const producerStored = await repository.save(producerStub);
    // validId = producerStored.id
  })

  afterAll(async () => {
    const repository = AppDataSourceTest.getRepository(FarmEntity);
    await repository.clear();
    await AppDataSourceTest.close();
  })

  describe('Create', () => {
    it('should return a new Producer', async () => {
      const newProducer = {
        name: 'Producer Test',
        document: '292.256.890-39'
      }
      const response = await supertest(app).post('/api/farms').send(newProducer).expect(HttpStatus.OK);
    })
  })
}) 