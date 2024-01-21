import { maskDocument } from "../../../infrastructure/api/helpers/mask-functions";
import ProducerDto from "../../../infrastructure/api/resources/producer/dto/producer.dto";
import ProducerEntity from "../../../infrastructure/database/typeorm/postgres/entities/producer.entity";
import { ProducerMockRepository } from "../../@shared/tests/mock/repository.mock";
import { producerStub } from "../../@shared/tests/stub";
import { CreateProducer } from "./create-producer";

describe("Create producer use case unit test", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it("should return a new Producer with valid data", async () => {
    const producerRepository = ProducerMockRepository(true);
    const createProducer = await new CreateProducer(producerRepository);
    const spyRepository = jest.spyOn(producerRepository, "create");
    const producerStored: ProducerEntity = await createProducer.execute(
      producerStub() as ProducerDto
    );
    expect(createProducer).toBeDefined();
    console.log(producerStored);
    expect(producerStored).toBeDefined();
    expect(producerStored.name).toBe(producerStub().name);
    expect(producerStored.document).toBe(maskDocument(producerStub().document));
    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(spyRepository).toHaveBeenCalledWith(producerStub());
  });

  it("should return an error with invalid document", async () => {
    expect(async () => {
      const producerRepository = ProducerMockRepository(true);
      const invalidIput: ProducerDto = {
        name: "Valid Name",
        document: "123.456.789-11",
      };
      const createProducer = await new CreateProducer(producerRepository);
      await createProducer.execute(invalidIput);
    }).rejects.toThrow();
  });

  it("should return an error with invalid name", async () => {
    expect(async () => {
      const producerRepository = ProducerMockRepository(true);
      const invalidIput: ProducerDto = {
        name: "",
        document: producerStub().document,
      };
      const createProducer = await new CreateProducer(producerRepository);
      await createProducer.execute(invalidIput);
    }).rejects.toThrow();
  });
});
