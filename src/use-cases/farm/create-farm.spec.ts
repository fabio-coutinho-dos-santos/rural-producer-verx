import 'express-async-errors'
import { AppDataSourceTest } from '../../infrastructure/database/typeorm/postgres/data-source-test';
import FarmEntity from '../../infrastructure/database/typeorm/entities/farms.entity';
import CreateFarm from './create-farm';
import { FarmRepository } from '../../infrastructure/database/repository/farm.repository';
import FarmRepositoryInterface from '../../domain/farm/repository/farm.repository.interface';

describe('Producer routes tests', () => {

  let farmRepository: FarmRepositoryInterface
  const requestBodyStubValid = {
    name: 'Farm name',
    city: 'City',
    state: 'State',
    totalArea: 10,
    arableArea: 2,
    vegetationArea: 4,
    crops: [
      'cotton',
      'coffe'
    ]
  }

  beforeAll(async () => {
    await AppDataSourceTest.initialize();
    await AppDataSourceTest.getRepository(FarmEntity).clear();
    farmRepository = new FarmRepository(AppDataSourceTest)
  })

  afterAll(async () => {
    await AppDataSourceTest.getRepository(FarmEntity).clear();
  })

  describe('Create farm usecase unit test', () => {
    it('should return a new farm with valid request', async () => {
      const createFarm = await new CreateFarm(farmRepository);
      const resp = await createFarm.execute(requestBodyStubValid);
      expect(createFarm).toBeDefined()
    })

    it('should return an error with invalid name', async () => {
      const requestBodyStub = {
        name: '',
        city: 'City',
        state: 'State',
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        crops: [
          'cotton',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository);
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
        crops: [
          'cotton',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository);
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
        crops: [
          'cotton',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository);
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
        crops: [
          'cotton',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository);
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
        crops: [
          'rice',
          'coffe'
        ]
      }

      expect(async () => {
        const createFarm = await new CreateFarm(farmRepository);
        const resp = await createFarm.execute(requestBodyStub);
      }).rejects.toThrow();
    })
  
  })
})