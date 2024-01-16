import FarmRepositoryInterface from "../../../../domain/farm/repository/farm.repository.interface";
import ProducerRepositoryInterface from "../../../../domain/producer/repository/producer.repository.interface";
import {
  amountFarmsStub,
  farmStub,
  inputUpdateProducerStub,
  producerStub,
  totalAreaFarmsStub,
} from "../stub";

export const FarmMockRepository = (): FarmRepositoryInterface => {
  return {
    create: jest.fn().mockResolvedValue(farmStub()),
    update: jest.fn().mockResolvedValue(farmStub()),
    delete: jest.fn(),
    findById: jest.fn().mockResolvedValue(farmStub()),
    findAll: jest.fn(),
    findWithRelations: jest.fn(),
    getAmountFarms: jest.fn().mockResolvedValue(amountFarmsStub()),
    getTotalArea: jest.fn().mockResolvedValue(totalAreaFarmsStub()),
  };
};

export const ProducerMockRepository = (
  returnProducer: boolean
): ProducerRepositoryInterface => {
  return {
    create: jest.fn(),
    update: jest.fn().mockResolvedValue({
      name: inputUpdateProducerStub().name,
      document: producerStub().document,
    }),
    delete: jest.fn(),
    findById: jest
      .fn()
      .mockResolvedValue(returnProducer ? producerStub() : null),
    findAll: jest.fn(),
    findWithRelations: jest.fn(),
    findOneWithRelations: jest.fn(),
  };
};
