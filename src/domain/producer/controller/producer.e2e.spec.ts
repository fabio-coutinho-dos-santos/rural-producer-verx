import 'express-async-errors'
import express from 'express'
import supertest from 'supertest'
import routes from "../../../routes";
import { AppDataSource } from '../../../infrastructure/database/typeorm/postgres/data-source';
import { httpError } from '../../../middlewares/http-errors';
import ProducerModel from '../../../infrastructure/database/typeorm/entities/producer.entity';
import { AppDataSourceTest } from '../../../infrastructure/database/typeorm/postgres/data-source-test';
import HttpStatus from 'http-status-codes'

describe('Producer routes tests', () => {

  const app = express();
  app.use(express.json())
  app.use(httpError)
  app.use(routes)

  beforeEach(async () => {
    await AppDataSource.initialize();
    await AppDataSourceTest.initialize();
  })

  afterEach(async () => {
    await AppDataSource.close();
    const repository = AppDataSourceTest.getRepository(ProducerModel);
    await repository.clear();
    await AppDataSourceTest.close();
  })

  describe('Create', () => {
    it('should return a new Producer', async () => {
      const producer = {
        name: 'Producer Name',
        document: '06535718603'
      }
      const response = await supertest(app).post('/api/producers').send(producer).expect(HttpStatus.CREATED);
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toMatchObject(producer)
    })

    it('should return an Exception with name invalid', async () => {
      const producer = {
        name: '',
        document: '06535718603'
      }
      await supertest(app).post('/api/producers').send(producer).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an Exception with document invalid', async () => {
      const producer = {
        name: 'Name',
        document: ''
      }
      await supertest(app).post('/api/producers').send(producer).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an Exception with document in invalid format', async () => {
      const producer = {
        name: 'Name',
        document: '12345678901'
      }
      await supertest(app).post('/api/producers').send(producer).expect(HttpStatus.BAD_REQUEST);
    })
  })

  describe('Get All', () => {
    it('should return all Producers', async () => {
      const response = await supertest(app).get('/api/producers').expect(HttpStatus.OK);
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('Get By Id', () => {
    it('should return a Producer when is used a valid id', async () => {
      const repository = AppDataSourceTest.getRepository(ProducerModel);
      const producerStub = {
        name: 'Producer Test',
        document: '780.366.920-40'
      } 
      const producerStored = await repository.save(producerStub);
      const validId = producerStored.id
      const response = await supertest(app).get(`/api/producers/${validId}`).expect(HttpStatus.OK);
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toMatchObject(producerStub)
    })

    it('should return a not found exception with wrong producer id', async () => {
      const invalidId = '78f9731e-17d8-4e05-a71b-cde40b43d2f4'
      const producer = await supertest(app).get(`/api/producers/${invalidId}`).expect(HttpStatus.NOT_FOUND)
    })
  })
}) 