import FarmAddress from "../../../domain/farm/value-object/farm-address";
import Farm from "../../../domain/farm/entity/farm.entity";
import Producer from "../../../domain/producer/entity/producer.entity";
import {
  AmountFarms,
  AreaTotalFarms,
  FarmsByCrop,
  FarmsByState,
} from "../../../domain/farm/repository/farm.repository.interface";
import FarmEntity from "../../../infrastructure/database/typeorm/postgres/entities/farms.entity";
import { PlantedCrops } from "../../../domain/producer/enum/planted-crops.enum";

export const validUuidFormat = (): string => {
  return "97fc317b-8842-47d0-8914-80bd3b5eac3a";
};

export const validCpfFormat = (): string => {
  return "292.256.890-39";
};

export const farmAddressStub = (): FarmAddress => {
  return new FarmAddress("Farm city", "Farm state");
};

export const farmStub = (): Farm => {
  return new Farm("Farm name", farmAddressStub(), validUuidFormat());
};

export const producerStub = (): Producer => {
  return new Producer("Name", validCpfFormat());
};

export const createFarmStub = (): Partial<FarmEntity> => {
  return {
    id: '97fc317b-8842-47d0-8914-80bd3b5eac3a',
    name: "Farm name",
    city: "City",
    state: "State",
    producerId: "97fc317b-8842-47d0-8914-80bd3b5eac3a",
    totalArea: 10,
    arableArea: 2,
    vegetationArea: 4,
    crops: [PlantedCrops.COTTON, PlantedCrops.COFFE],
  }
}

export const inputCreateFarmStub = () => {
  return {
    name: "Farm name",
    city: "City",
    state: "State",
    producerId: "97fc317b-8842-47d0-8914-80bd3b5eac3a",
    totalArea: 10,
    arableArea: 2,
    vegetationArea: 4,
    crops: ["cotton", "coffe"],
  };
};

export const inputUpdateFarmStub = () => {
  return {
    name: "Farm name",
    city: "City",
    producerId: "97fc317b-8842-47d0-8914-80bd3b5eac3a",
    state: "State",
    crops: ["cotton", "coffe"],
  };
};

export const inputUpdateFarmStubInvalidArea = () => {
  return {
    name: "Farm name",
    city: "City",
    producerId: "97fc317b-8842-47d0-8914-80bd3b5eac3a",
    state: "State",
    totalArea: 10,
    arableArea: 2,
    vegetationArea: 9,
    crops: ["cotton", "coffe"],
  };
};

export const inputUpdateProducerStub = () => {
  return {
    name: "Producer Name",
  };
};

export const amountFarmsStub = (): AmountFarms => {
  return {
    amount: "10",
  };
};

export const totalAreaFarmsStub = (): AreaTotalFarms => {
  return {
    total: 87.9,
    arable: 23,
    vegetation: 50,
  };
};

export const totalFarmsGroupedByStateStub = (): FarmsByState[] => {
  const result = [
    {
      amount: 10,
      state: "State1",
    },
    {
      amount: 10,
      state: "State2",
    },
  ];
  return result
};

export const totalFarmsGroupedByCropStub = (): FarmsByCrop[] => {
  const result = [
    {
      amount: 10,
      crop: "coffe",
    },
    {
      amount: 10,
      crop: "soy",
    },
  ];
  return result
};

