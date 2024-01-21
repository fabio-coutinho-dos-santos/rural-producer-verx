import { FarmMockRepository } from "../../@shared/tests/mock/repository.mock";
import { GetAllFarms } from "./get-all-farms";

describe("Get all farms use case tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return all farms paginated", async () => {
    const farmRepository = FarmMockRepository();
    const spy = jest.spyOn(farmRepository, "findWithRelations")
    const page: number = 1;
    const pageSize: number = 10;
    const allFarmsPaginated = await new GetAllFarms(
      farmRepository
    ).execute(page, pageSize);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(allFarmsPaginated).toBeInstanceOf(Object)
    expect(allFarmsPaginated.farms).toBeInstanceOf(Array)
  });
});
