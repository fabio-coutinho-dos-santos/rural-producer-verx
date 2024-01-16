import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";
import ProducerRepositoryInterface from "../../../domain/producer/repository/producer.repository.interface";
import FarmDto from "../../../infrastructure/api/farm/dto/farm.dto";
import {
  FarmMockRepository,
  ProducerMockRepository,
} from "../../@shared/tests/mock/repository.mock";
import {
  farmStub,
  inputUpdateFarmStub,
  inputUpdateFarmStubInvalidArea,
  validUuidFormat,
} from "../../@shared/tests/stub";
import UpdateFarm from "./update-farm";

describe("Update Farm use case", () => {
  describe("validate producer", () => {
    it("should return void with valid data", async () => {
      const returnProducerFlag = true;
      const farmRepository: FarmRepositoryInterface = FarmMockRepository();
      const producerRepository: ProducerRepositoryInterface =
        ProducerMockRepository(returnProducerFlag);
      const updateFarm = new UpdateFarm(farmRepository, producerRepository);
      const result = await updateFarm.validateProducer(inputUpdateFarmStub());
      expect(result).toBe(undefined);
    });

    it("should return not found error with invalid producer Id", async () => {
      expect(async () => {
        const returnProducerFlag = false;
        const farmRepository: FarmRepositoryInterface = FarmMockRepository();
        const producerRepository: ProducerRepositoryInterface =
          ProducerMockRepository(returnProducerFlag);
        const updateFarm = new UpdateFarm(farmRepository, producerRepository);
        await updateFarm.validateProducer(inputUpdateFarmStub());
      }).rejects.toThrow("Producer not found");
    });
  });

  describe("execute function", () => {
    it("should return void with valid data", async () => {
      const returnProducerFlag = true;
      const farmRepository: FarmRepositoryInterface = FarmMockRepository();
      const producerRepository: ProducerRepositoryInterface =
        ProducerMockRepository(returnProducerFlag);
      const updateFarm = new UpdateFarm(farmRepository, producerRepository);

      const spyValidateProducer = jest.spyOn(updateFarm, "validateProducer");
      const spyBuildCompleteFarm = jest.spyOn(updateFarm, "buildCompleteFarm");

      const farmUpdated = await updateFarm.execute(
        inputUpdateFarmStub() as FarmDto,
        validUuidFormat()
      );

      expect(spyValidateProducer).toHaveBeenCalledTimes(1);
      expect(spyValidateProducer).toHaveBeenCalledWith(inputUpdateFarmStub());

      expect(spyBuildCompleteFarm).toHaveBeenCalledTimes(1);
      expect(spyBuildCompleteFarm).toHaveBeenCalledWith(
        inputUpdateFarmStub(),
        validUuidFormat()
      );

      expect(farmUpdated).toMatchObject(farmStub());
    });

    it("should return not found error with invalid producer Id", async () => {
      expect(async () => {
        const returnProducerFlag = false;
        const farmRepository: FarmRepositoryInterface = FarmMockRepository();
        const producerRepository: ProducerRepositoryInterface =
          ProducerMockRepository(returnProducerFlag);
        const updateFarm = new UpdateFarm(farmRepository, producerRepository);
        await updateFarm.execute(
          inputUpdateFarmStub() as FarmDto,
          validUuidFormat()
        );
      }).rejects.toThrow("Producer not found");
    });

    it("should return an error with invalid area proportion", async () => {
      expect(async () => {
        const returnProducerFlag = true;
        const farmRepository: FarmRepositoryInterface = FarmMockRepository();
        const producerRepository: ProducerRepositoryInterface =
          ProducerMockRepository(returnProducerFlag);
        const updateFarm = new UpdateFarm(farmRepository, producerRepository);
        await updateFarm.execute(
          inputUpdateFarmStubInvalidArea() as FarmDto,
          validUuidFormat()
        );
      }).rejects.toThrow();
    });
  });
});
