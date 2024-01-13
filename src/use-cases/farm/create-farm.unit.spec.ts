import 'express-async-errors'
import { AppDataSourceTest } from '../../infrastructure/database/typeorm/postgres/data-source-test';
import FarmEntity from '../../infrastructure/database/typeorm/entities/farms.entity';
import CreateFarm from './create-farm';
import { FarmRepository } from '../../infrastructure/database/repository/farm.repository';
import FarmRepositoryInterface from '../../domain/farm/repository/farm.repository.interface';
import ProducerRepositoryInterface from '../../domain/producer/repository/producer.repository.interface';
import ProducerEntity from '../../infrastructure/database/typeorm/entities/producer.entity';
import { ProducerRepository } from '../../infrastructure/database/repository/producer.repository';
import Producer from '../../domain/producer/entity/producer.entity';

describe('Producer routes tests', () => {

  let farmRepository: FarmRepositoryInterface
  let producerRepository: ProducerRepositoryInterface

  const producer = new Producer(
    "Name",
    "292.256.890-39"
  )

  let requestBodyStubValid: any;
  let producerStored: any;

  beforeAll(async () => {
    await AppDataSourceTest.initialize();
    await AppDataSourceTest.getRepository(FarmEntity).delete({});
    await AppDataSourceTest.getRepository(ProducerEntity).delete({});

    farmRepository = new FarmRepository(AppDataSourceTest)
    producerRepository = new ProducerRepository(AppDataSourceTest)
    producerStored = await producerRepository.create(producer)
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
    await AppDataSourceTest.getRepository(FarmEntity).delete({});
  })

  describe('Create farm usecase unit test', () => {
    it('should return a new farm with valid request', async () => {
      const createFarm = await new CreateFarm(farmRepository, producerRepository);
      const resp = await createFarm.execute(requestBodyStubValid);
      expect(createFarm).toBeDefined()
    })

    it('should return an error with invalid name', async () => {
      const requestBodyStub = {
        name: '',
        city: 'City',
        state: 'State',
        totalArea: 10,
        producerId: producerStored.id,
        arableArea: 2,
        vegetationArea: 4,
        crops: [
          'cotton',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository, producerRepository);
        const resp = await createFarm.execute(requestBodyStub);
      }).rejects.toThrow();
    })

    it('should return an error with invalid city', async () => {
      const requestBodyStub = {
        name: 'Name',
        city: '',
        state: 'State',
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        producerId: producerStored.id,
        crops: [
          'cotton',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository, producerRepository);
        const resp = await createFarm.execute(requestBodyStub);
      }).rejects.toThrow();
    })

    it('should return an error with invalid state', async () => {
      const requestBodyStub = {
        name: 'Name',
        city: 'City',
        state: '',
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        producerId: producerStored.id,
        crops: [
          'cotton',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository, producerRepository);
        const resp = await createFarm.execute(requestBodyStub);
      }).rejects.toThrow();
    })

    it('should return an error with invalid area proportion', async () => {
      const requestBodyStub = {
        name: 'Name',
        city: 'City',
        state: 'State',
        totalArea: 10,
        arableArea: 5,
        vegetationArea: 6,
        producerId: producerStored.id,
        crops: [
          'cotton',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository, producerRepository);
        const resp = await createFarm.execute(requestBodyStub);
      }).rejects.toThrow();
    })

    it('should return an error with invalid crops', async () => {
      const requestBodyStub = {
        name: 'Name',
        city: 'City',
        state: 'State',
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        producerId: producerStored.id,
        crops: [
          'rice',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository, producerRepository);
        const resp = await createFarm.execute(requestBodyStub);
      }).rejects.toThrow();
    })

    it('should return an error with invalid producer id', async () => {
      const requestBodyStub = {
        name: 'Name',
        city: 'City',
        state: 'State',
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        producerId:'8d064745-cc9b-4ab4-b338-b7cf9a4514ec',
        crops: [
          'cotton',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository, producerRepository);
        const resp = await createFarm.execute(requestBodyStub);
      }).rejects.toThrow();
    })

  })
})