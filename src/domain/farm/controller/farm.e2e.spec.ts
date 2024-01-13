import 'express-async-errors'
import express from 'express'
import supertest from 'supertest'
import routes from "../../../routes";
import { httpError } from '../../../middlewares/http-errors';
import { AppDataSourceTest } from '../../../infrastructure/database/typeorm/postgres/data-source-test';
import HttpStatus from 'http-status-codes'
import FarmEntity from '../../../infrastructure/database/typeorm/entities/farms.entity';
import ProducerEntity from '../../../infrastructure/database/typeorm/entities/producer.entity';
import Producer from '../../producer/entity/producer.entity';

describe('Farms routes tests', () => {

  const app = express();
  app.use(express.json())
  app.use(httpError)
  app.use(routes)

  let farmRepository: any
  let producerRepository: any

  const producer = new Producer(
    "Name",
    "292.256.890-39"
  )

  let requestBodyStubValid: any;
  let producerStored: any;

  beforeAll(async () => {
    await AppDataSourceTest.initialize();
    farmRepository = AppDataSourceTest.getRepository(FarmEntity);
    producerRepository = AppDataSourceTest.getRepository(ProducerEntity);
    await farmRepository.delete({})
    await producerRepository.delete({})

    producerStored = await producerRepository.save(producer)
    requestBodyStubValid = {
      name: 'Farm name',
      city: 'City',
      state: 'State',
      producerId: producerStored.id,
      totalArea: 10,
      arableArea: 2,
      vegetationArea: 4,
      crops: [
        'cotton',
        'coffe'
      ]
    }
  })

  afterAll(async () => {
    const repository = AppDataSourceTest.getRepository(FarmEntity);
    await repository.delete({});
    await AppDataSourceTest.close();
  })

  describe('Create', () => {
    const repository = AppDataSourceTest.getRepository(ProducerEntity);

    it('should return a new Farm with valid data', async () => {
      const farmStubValid = {
        name: 'Farm name',
        city: 'City',
        state: 'State',
        producerId: producerStored.id,
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        crops: [
          'cotton',
          'coffe'
        ]
      }
      const response = await supertest(app).post('/api/farms').send(farmStubValid).expect(HttpStatus.CREATED);
    })

    it('should return an error with invalid producerId', async () => {
      const farmStubValid = {
        name: 'Farm name',
        city: 'City',
        state: 'State',
        producerId: 'b1419ac5-0d1b-416f-b6d7-9fcdb12a8dc4',
      }
      const response = await supertest(app).post('/api/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an error with invalid name', async () => {
      const farmStubValid = {
        name: '',
        city: 'City',
        state: 'State',
        producerId: producerStored.id,
      }
      const response = await supertest(app).post('/api/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an error with invalid city', async () => {
      const farmStubValid = {
        name: 'Name',
        city: '',
        state: 'State',
        producerId: producerStored.id,
      }
      const response = await supertest(app).post('/api/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an error with invalid state', async () => {
      const farmStubValid = {
        name: 'Name',
        city: 'City',
        state: '',
        producerId: producerStored.id,
      }
      const response = await supertest(app).post('/api/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an error with invalid area proportion', async () => {
      const farmStubValid = {
        name: 'Farm name',
        city: 'City',
        state: 'State',
        producerId: producerStored.id,
        totalArea: 10,
        arableArea: 7,
        vegetationArea: 4,
        crops: [
          'cotton',
          'coffe'
        ]
      }
      const response = await supertest(app).post('/api/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an error with invalid crop', async () => {
      const farmStubValid = {
        name: 'Farm name',
        city: 'City',
        state: 'State',
        producerId: producerStored.id,
        totalArea: 10,
        arableArea: 3,
        vegetationArea: 4,
        crops: [
          'rice',
          'coffe'
        ]
      }
      const response = await supertest(app).post('/api/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
    })
  })
}) 