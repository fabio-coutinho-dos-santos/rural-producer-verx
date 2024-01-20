import { ProducerMockRepository } from "../../@shared/tests/mock/repository.mock";
import { GetAllProducer } from "./get-all-producers";

describe("Get all producers use case tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return all producers paginated", async () => {
    const producerRepository = ProducerMockRepository(true);
    const spy = jest.spyOn(producerRepository, "findWithRelations")
    const page: number = 1;
    const pageSize: number = 10;
    const allProducersPaginated = await new GetAllProducer(
      producerRepository
    ).execute(page, pageSize);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(allProducersPaginated).toBeInstanceOf(Object)
    expect(allProducersPaginated.producers).toBeInstanceOf(Array)
  });
});
