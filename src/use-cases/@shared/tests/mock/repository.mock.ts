import FarmRepositoryInterface from "../../../../domain/farm/repository/farm.repository.interface"
import ProducerRepositoryInterface from "../../../../domain/producer/repository/producer.repository.interface"
import { farmStub, inputUpdateProducerStub, producerStub } from "../stub"

export const FarmMockRepository = (): FarmRepositoryInterface => {
  return {
    create: jest.fn().mockResolvedValue(farmStub()),
    update: jest.fn().mockResolvedValue(farmStub()),
    delete: jest.fn(),
    findById: jest.fn().mockResolvedValue(farmStub()),
    findAll: jest.fn(),
    findWithRelations: jest.fn(),
    getAmountFarms: jest.fn(),
    getTotalArea: jest.fn(),
  }
}

export const ProducerMockRepository = (returnProducer: boolean): ProducerRepositoryInterface => {
  return {
    create: jest.fn(),
    update: jest.fn().mockResolvedValue({
      name: inputUpdateProducerStub().name,
      document: producerStub().document
    }),
    delete: jest.fn(),
    findById: jest.fn().mockResolvedValue(returnProducer ? producerStub() : null),
    findAll: jest.fn(),
    findWithRelations: jest.fn(),
    findOneWithRelations: jest.fn(),
  }
}