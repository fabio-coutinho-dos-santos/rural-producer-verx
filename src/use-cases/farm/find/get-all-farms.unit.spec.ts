import { FarmMockRepository } from "../../@shared/tests/mock/repository.mock";
import { GetAllFarms } from "./get-all-farms";

describe("Get all producers use case tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return all producers paginated", async () => {
    const producerRepository = FarmMockRepository();
    const spy = jest.spyOn(producerRepository, "findWithRelations")
    const page: number = 1;
    const pageSize: number = 10;
    const allProducersPaginated = await new GetAllFarms(
      producerRepository
    ).execute(page, pageSize);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(allProducersPaginated).toBeInstanceOf(Object)
    expect(allProducersPaginated.farms).toBeInstanceOf(Array)
  });
});
