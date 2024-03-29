import "express-async-errors";
import CreateFarm from "./create-farm";
import {
  createFarmStub,
  inputCreateFarmStub,
  validUuidFormat,
} from "../../@shared/tests/stub";
import {
  FarmMockRepository,
  ProducerMockRepository,
} from "../../@shared/tests/mock/repository.mock";
import FarmDto from "../../../infrastructure/api/resources/farm/dto/farm.dto";
import FarmEntity from "../../../infrastructure/database/typeorm/postgres/entities/farms.entity";

describe("Create Farm usecas unit test", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe("Create farm usecase unit test", () => {
    it("should return a new farm with valid request", async () => {
      const producerRepository = ProducerMockRepository(true);
      const farmRepository = FarmMockRepository();
      const createFarm = await new CreateFarm(
        farmRepository,
        producerRepository
      );
      const resp: FarmEntity = await createFarm.execute(inputCreateFarmStub() as FarmDto);
      expect(createFarm).toBeDefined();
      expect(resp).toBeDefined();
      expect(resp.name).toBe(createFarmStub().name);
      expect(resp.city).toBe(createFarmStub().city);
      expect(resp.state).toBe(createFarmStub().state);
    });

    it("should return an error with invalid name", async () => {
      const requestBodyStub = {
        name: "",
        city: "City",
        state: "State",
        totalArea: 10,
        producerId: validUuidFormat(),
        arableArea: 2,
        vegetationArea: 4,
        crops: ["cotton", "coffe"],
      };

      expect(async () => {
        const producerRepository = ProducerMockRepository(true);
        const farmRepository = FarmMockRepository();
        const createFarm = await new CreateFarm(
          farmRepository,
          producerRepository
        );
        await createFarm.execute(requestBodyStub as FarmDto);
      }).rejects.toThrow();
    });

    it("should return an error with invalid city", async () => {
      const requestBodyStub = {
        name: "Name",
        city: "",
        state: "State",
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        producerId: validUuidFormat(),
        crops: ["cotton", "coffe"],
      };

      expect(async () => {
        const producerRepository = ProducerMockRepository(true);
        const farmRepository = FarmMockRepository();
        const createFarm = await new CreateFarm(
          farmRepository,
          producerRepository
        );
        await createFarm.execute(requestBodyStub as FarmDto);
      }).rejects.toThrow();
    });

    it("should return an error with invalid state", async () => {
      const requestBodyStub = {
        name: "Name",
        city: "City",
        state: "",
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        producerId: validUuidFormat(),
        crops: ["cotton", "coffe"],
      };

      expect(async () => {
        const producerRepository = ProducerMockRepository(true);
        const farmRepository = FarmMockRepository();
        const createFarm = await new CreateFarm(
          farmRepository,
          producerRepository
        );
        await createFarm.execute(requestBodyStub as FarmDto);
      }).rejects.toThrow();
    });

    it("should return an error with invalid area proportion", async () => {
      const requestBodyStub = {
        name: "Name",
        city: "City",
        state: "State",
        totalArea: 10,
        arableArea: 5,
        vegetationArea: 6,
        producerId: validUuidFormat(),
        crops: ["cotton", "coffe"],
      };

      expect(async () => {
        const producerRepository = ProducerMockRepository(true);
        const farmRepository = FarmMockRepository();
        const createFarm = await new CreateFarm(
          farmRepository,
          producerRepository
        );
        await createFarm.execute(requestBodyStub as FarmDto);
      }).rejects.toThrow();
    });

    it("should return an error with invalid crops", async () => {
      const requestBodyStub = {
        name: "Name",
        city: "City",
        state: "State",
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        producerId: validUuidFormat(),
        crops: ["rice", "coffe"],
      };

      expect(async () => {
        const producerRepository = ProducerMockRepository(true);
        const farmRepository = FarmMockRepository();
        const createFarm = await new CreateFarm(
          farmRepository,
          producerRepository
        );
        await createFarm.execute(requestBodyStub as FarmDto);
      }).rejects.toThrow();
    });

    it("should return an error with invalid producer id", async () => {
      const requestBodyStub = {
        name: "Name",
        city: "City",
        state: "State",
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        producerId: validUuidFormat(),
        crops: ["cotton", "coffe"],
      };

      expect(async () => {
        const farmRepository = FarmMockRepository();
        const producerRepository = ProducerMockRepository(false);
        const createFarm = await new CreateFarm(
          farmRepository,
          producerRepository
        );
        await createFarm.execute(requestBodyStub as FarmDto);
      }).rejects.toThrow();
    });
  });
});
