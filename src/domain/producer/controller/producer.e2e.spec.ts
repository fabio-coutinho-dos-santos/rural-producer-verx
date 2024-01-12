import 'express-async-errors'
import express from 'express'
import supertest from 'supertest'
import routes from "../../../routes";
import { httpError } from '../../../middlewares/http-errors';
import { AppDataSourceTest } from '../../../infrastructure/database/typeorm/postgres/data-source-test';
import HttpStatus from 'http-status-codes'
import ProducerEntity from '../../../infrastructure/database/typeorm/entities/producer.entity';

describe('Producer routes tests', () => {

  const app = express();
  app.use(express.json())
  app.use(httpError)
  app.use(routes)

  let validId='';
  let producerStub = {
    name: 'Producer Test',
    document: '780.366.920-40'
  }
  const invalidId = '78f9731e-17d8-4e05-a71b-cde40b43d2f4'

  beforeAll(async () => {
    await AppDataSourceTest.initialize();
    const repository = AppDataSourceTest.getRepository(ProducerEntity);
    const producerStored = await repository.save(producerStub);
    validId = producerStored.id
  })

  afterAll(async () => {
    const repository = AppDataSourceTest.getRepository(ProducerEntity);
    await repository.clear();
    await AppDataSourceTest.close();
  })

  describe('Create', () => {
    it('should return a new Producer', async () => {
      const newProducer = {
        name: 'Producer Test',
        document: '292.256.890-39'
      }
      const response = await supertest(app).post('/api/producers').send(newProducer).expect(HttpStatus.CREATED);
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body.name).toBe(newProducer.name)
      expect(response.body.document).toBe(newProducer.document)
    })

    it('should return an Exception with same document', async () => {
     await supertest(app).post('/api/producers').send(producerStub).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an Exception with name invalid', async () => {
      const producer = {
        name: '',
        document: '780.366.920-40'
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
      const response = await supertest(app).get(`/api/producers/${validId}`).expect(HttpStatus.OK);
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body.name).toBe(producerStub.name)
      expect(response.body.document).toBe(producerStub.document)
    })

    it('should return a not found exception with wrong producer id', async () => {
      await supertest(app).get(`/api/producers/${invalidId}`).expect(HttpStatus.NOT_FOUND)
    })
  })

  describe('Delete', () => {
    it('shold reuturn true with valid id', async () => {
      await supertest(app).delete(`/api/producers/${validId}`).expect(HttpStatus.NO_CONTENT);
    })

    it('should return a not found exception with wrong producer id', async () => {
      await supertest(app).delete(`/api/producers/${invalidId}`).expect(HttpStatus.NOT_FOUND)
    })
  })
}) 