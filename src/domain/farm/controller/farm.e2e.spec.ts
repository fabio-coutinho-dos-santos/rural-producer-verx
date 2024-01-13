import 'express-async-errors'
import express from 'express'
import supertest from 'supertest'
import { httpError } from '../../../middlewares/http-errors';
import { AppDataSourceTest } from '../../../infrastructure/database/typeorm/postgres/data-source-test';
import HttpStatus from 'http-status-codes'
import FarmEntity from '../../../infrastructure/database/typeorm/entities/farms.entity';
import ProducerEntity from '../../../infrastructure/database/typeorm/entities/producer.entity';
import Producer from '../../producer/entity/producer.entity';
import farmRoutes from '../farm.routes';
import { PlantedCrops } from '../../producer/enum/planted-crops.enum';

describe('Farms routes tests', () => {

  const app = express();
  app.use(express.json())
  app.use(httpError)
  app.use(farmRoutes)

  let farmRepository: any
  let producerRepository: any

  const producer = new Producer(
    "Name",
    "292.256.890-39"
  )

  let requestBodyStubValid: any;
  let requestBodyStubValid2: any;
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

    requestBodyStubValid2 = {
      name: 'Farm name',
      city: 'City',
      state: 'State',
      producerId: producerStored.id,
      totalArea: 25.5,
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
      const response = await supertest(app).post('/api/v1/farms').send(farmStubValid).expect(HttpStatus.CREATED);
    })

    it('should return an error with invalid producerId', async () => {
      const farmStubValid = {
        name: 'Farm name',
        city: 'City',
        state: 'State',
        producerId: 'b1419ac5-0d1b-416f-b6d7-9fcdb12a8dc4',
      }
      const response = await supertest(app).post('/api/v1/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an error with invalid name', async () => {
      const farmStubValid = {
        name: '',
        city: 'City',
        state: 'State',
        producerId: producerStored.id,
      }
      const response = await supertest(app).post('/api/v1/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an error with invalid city', async () => {
      const farmStubValid = {
        name: 'Name',
        city: '',
        state: 'State',
        producerId: producerStored.id,
      }
      const response = await supertest(app).post('/api/v1/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
    })

    it('should return an error with invalid state', async () => {
      const farmStubValid = {
        name: 'Name',
        city: 'City',
        state: '',
        producerId: producerStored.id,
      }
      const response = await supertest(app).post('/api/v1/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
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
      const response = await supertest(app).post('/api/v1/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
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
      const response = await supertest(app).post('/api/v1/farms').send(farmStubValid).expect(HttpStatus.BAD_REQUEST);
    })
  })

  describe('Get All', () => {
    it('should return a farm array', async () => {
      const response = await supertest(app).get('/api/v1/farms').expect(HttpStatus.OK)
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('Update Farm', () => {
    it('should return a updated farm with valid data', async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid);
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: 'Farm name updated',
        city: 'City updated',
        state: 'State updated',
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 4,
        crops: [
          PlantedCrops.COFFE,
          PlantedCrops.CORN,
          PlantedCrops.COTTON,
        ]
      }

      const response = await supertest(app).patch(`/api/v1/farms/${farmId}`).send(requestToUpdateFarm).expect(HttpStatus.OK)
      const farmUpdated = response.body
      expect(farmUpdated).toBeInstanceOf(Object)
    })

    it('should return an error with invalid name', async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid);
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: '',
        city: 'City updated',
        state: 'State updated',
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 4,
        crops: [
          PlantedCrops.COFFE,
          PlantedCrops.CORN,
          PlantedCrops.COTTON,
        ]
      }

      const response = await supertest(app).patch(`/api/v1/farms/${farmId}`).send(requestToUpdateFarm).expect(HttpStatus.BAD_REQUEST)
    })

    it('should return an error with invalid city', async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid);
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: 'Name',
        city: '',
        state: 'State updated',
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 4,
        crops: [
          PlantedCrops.COFFE,
          PlantedCrops.CORN,
          PlantedCrops.COTTON,
        ]
      }

      const response = await supertest(app).patch(`/api/v1/farms/${farmId}`).send(requestToUpdateFarm).expect(HttpStatus.BAD_REQUEST)
    })

    it('should return an error with invalid state', async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid);
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: 'Name',
        city: 'City updated',
        state: '',
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 4,
        crops: [
          PlantedCrops.COFFE,
          PlantedCrops.CORN,
          PlantedCrops.COTTON,
        ]
      }

      const response = await supertest(app).patch(`/api/v1/farms/${farmId}`).send(requestToUpdateFarm).expect(HttpStatus.BAD_REQUEST)
    })

    it('should return an error with invalid area proportion', async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid);
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: 'Name',
        city: 'City updated',
        state: 'State',
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 9,
        crops: [
          PlantedCrops.COFFE,
          PlantedCrops.CORN,
          PlantedCrops.COTTON,
        ]
      }

      const response = await supertest(app).patch(`/api/v1/farms/${farmId}`).send(requestToUpdateFarm).expect(HttpStatus.BAD_REQUEST)
    })

    it('should return an error with invalid crop', async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid);
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: 'Name',
        city: 'City updated',
        state: 'State',
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 9,
        crops: [
          'rice',
          PlantedCrops.CORN,
          PlantedCrops.COTTON,
        ]
      }

      const response = await supertest(app).patch(`/api/v1/farms/${farmId}`).send(requestToUpdateFarm).expect(HttpStatus.BAD_REQUEST)
    })

  })

  describe('Delete Farm', () => {
    it('should return no content with valid data', async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid);
      const farmId = farmStored.id;
      await supertest(app).delete(`/api/v1/farms/${farmId}`).expect(HttpStatus.NO_CONTENT)
    })

    it('should return an not found error with invalid id', async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid);
      const farmId = 'db659f80-ba5e-435a-8b44-23a2d0667e73';
      await supertest(app).delete(`/api/v1/farms/${farmId}`).expect(HttpStatus.NOT_FOUND)
    })
  })

  describe('Get Amount Farms', () => {
    it('should return an amount', async () => {
      await AppDataSourceTest.getRepository(FarmEntity).delete({});
      await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid);
      await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid2);
      const response = await supertest(app).get('/api/v1/farms/amount').expect(HttpStatus.OK)
      expect(response.body.amountFarms).toBe(2)
    })
  })

  describe('Get Total Area', () => {
    it('should return an amount', async () => {
      await AppDataSourceTest.getRepository(FarmEntity).delete({});
      await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid);
      await AppDataSourceTest.getRepository(FarmEntity).save(requestBodyStubValid2);
      const response = await supertest(app).get('/api/v1/farms/area/total').expect(HttpStatus.OK)
      expect(response.body.totalArea).toBe(requestBodyStubValid.totalArea.valueOf() + requestBodyStubValid2.totalArea.valueOf())
    })
  })
}) 