import FarmRepositoryInterface from "../../../../domain/farm/repository/farm.repository.interface";
import ProducerRepositoryInterface from "../../../../domain/producer/repository/producer.repository.interface";
import {
  amountFarmsStub,
  createFarmStub,
  farmStub,
  farmsWithProducerRelation,
  inputUpdateProducerStub,
  producerStub,
  producerWithFarmRelationStub,
  totalAreaFarmsStub,
  totalFarmsGroupedByCropStub,
  totalFarmsGroupedByStateStub,
} from "../stub";

export const FarmMockRepository = (): FarmRepositoryInterface => {
  return {
    count: jest.fn(),
    create: jest.fn().mockResolvedValue(createFarmStub()),
    update: jest.fn().mockResolvedValue(farmStub()),
    delete: jest.fn(),
    findById: jest.fn().mockResolvedValue(farmStub()),
    findAll: jest.fn(),
    findWithRelations: jest
      .fn()
      .mockResolvedValue([farmsWithProducerRelation()]),
    findOneWithRelations: jest.fn(),
    getAmountFarms: jest.fn().mockResolvedValue(amountFarmsStub()),
    getTotalArea: jest.fn().mockResolvedValue(totalAreaFarmsStub()),
    getByCrop: jest.fn().mockResolvedValue(totalFarmsGroupedByCropStub()),
    getByState: jest.fn().mockResolvedValue(totalFarmsGroupedByStateStub()),
  };
};

export const ProducerMockRepository = (
  returnProducer: boolean
): ProducerRepositoryInterface => {
  return {
    count: jest.fn(),
    create: jest.fn().mockResolvedValue(producerStub()),
    update: jest.fn().mockResolvedValue({
      name: inputUpdateProducerStub().name,
      document: producerStub().document,
    }),
    delete: jest.fn().mockResolvedValue({ raw: [], affected: 1 }),
    findById: jest
      .fn()
      .mockResolvedValue(returnProducer ? producerStub() : null),
    findAll: jest.fn().mockResolvedValue([producerStub()]),
    findWithRelations: jest
      .fn()
      .mockResolvedValue([producerWithFarmRelationStub()]),
    findOneWithRelations: jest
      .fn()
      .mockResolvedValue(
        returnProducer ? producerWithFarmRelationStub() : undefined
      ),
  };
};
