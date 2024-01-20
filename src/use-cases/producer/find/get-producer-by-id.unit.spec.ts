import { ProducerMockRepository } from "../../@shared/tests/mock/repository.mock";
import { producerWithFarmRelationStub, validUuidFormat } from "../../@shared/tests/stub";
import { GetProducerById } from "./get-producer-by-id";

describe("Get producer by id use case tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return one producer with valid id", async () => {
    const producerRepository = ProducerMockRepository(true);
    const spy = jest.spyOn(producerRepository, "findOneWithRelations");
    const producerStored = await new GetProducerById(
      producerRepository
    ).execute(validUuidFormat());
    expect(spy).toHaveBeenCalledTimes(1);
    expect(producerStored).toMatchObject(producerWithFarmRelationStub())
  });

  it("Should return null producer with invalid id", async () => {
    const producerRepository = ProducerMockRepository(false);
    const spy = jest.spyOn(producerRepository, "findOneWithRelations");
    const producerStored = await new GetProducerById(
      producerRepository
    ).execute(validUuidFormat());
    console.log(producerStored);
    expect(producerStored).toBeUndefined()
  });
});
