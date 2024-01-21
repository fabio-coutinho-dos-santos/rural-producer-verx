import { ProducerMockRepository } from "../../@shared/tests/mock/repository.mock";
import { validUuidFormat } from "../../@shared/tests/stub";
import { DeleteProducer } from "./delete-producer";

describe("Delete producer use case tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return true with valid id", async () => {
    const producerRepository = ProducerMockRepository(true);
    const spyFind = jest.spyOn(producerRepository, "findOneWithRelations");
    const spyDelete = jest.spyOn(producerRepository, "delete");
    const deleted = await new DeleteProducer(
      producerRepository
    ).execute(validUuidFormat());
    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(deleted).toBe(true);
  });

  it("Should return Not Found Error with invalid id", async () => {
    expect(async () => {
      const producerRepository = ProducerMockRepository(false);
      await new DeleteProducer(
        producerRepository
      ).execute(validUuidFormat());
    }).rejects.toThrow('Producer not found')
  });
});
