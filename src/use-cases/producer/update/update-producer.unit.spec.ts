import ProducerRepositoryInterface from "../../../domain/producer/repository/producer.repository.interface";
import ProducerDto from "../../../infrastructure/api/producer/dto/producer.dto";
import { ProducerMockRepository } from "../../@shared/tests/mock/repository.mock";
import {
  inputUpdateProducerStub,
  producerStub,
  validUuidFormat,
} from "../../@shared/tests/stub";
import UpdateProducer from "./update-producer";

describe("Update producer use case", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe("buildNewProducer function", () => {
    it("should return a producer with valid data", async () => {
      const producerRepository: ProducerRepositoryInterface =
        ProducerMockRepository(true);
      const updateProducer = new UpdateProducer(producerRepository);
      const producerBuilded = await updateProducer.buildNewProducer(
        inputUpdateProducerStub() as ProducerDto,
        validUuidFormat()
      );
      expect(producerBuilded).toBeDefined();
      expect(producerBuilded.name).toBe(inputUpdateProducerStub().name);
      expect(producerBuilded.document).toBe(producerStub().document);
    });

    it("should return a not found error with invalid producer id", async () => {
      expect(async () => {
        const producerRepository: ProducerRepositoryInterface =
          ProducerMockRepository(false);
        const updateProducer = new UpdateProducer(producerRepository);
        await updateProducer.buildNewProducer(
          inputUpdateProducerStub() as ProducerDto,
          validUuidFormat()
        );
      }).rejects.toThrow("Producer not found");
    });
  });

  describe("execute function", () => {
    it("should return a producer with valid data", async () => {
      const producerRepository: ProducerRepositoryInterface =
        ProducerMockRepository(true);
      const updateProducer = new UpdateProducer(producerRepository);
      const spyBuildNewProducer = await jest.spyOn(
        updateProducer,
        "buildNewProducer"
      );
      const producerUpdated = await updateProducer.execute(
        inputUpdateProducerStub() as ProducerDto,
        validUuidFormat()
      );
      expect(producerUpdated).toBeDefined();
      expect(producerUpdated.name).toBe(producerStub().name);
      expect(producerUpdated.document).toBe(producerStub().document);
      expect(spyBuildNewProducer).toHaveBeenCalledTimes(1);
      expect(spyBuildNewProducer).toHaveBeenCalledWith(
        inputUpdateProducerStub(),
        validUuidFormat()
      );
    });

    it("should return a not found error with invalid producer id", async () => {
      expect(async () => {
        const producerRepository: ProducerRepositoryInterface =
          ProducerMockRepository(false);
        const updateProducer = new UpdateProducer(producerRepository);
        await updateProducer.buildNewProducer(
          inputUpdateProducerStub() as ProducerDto,
          validUuidFormat()
        );
      }).rejects.toThrow("Producer not found");
    });
  });
});
