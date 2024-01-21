import { FarmMockRepository } from "../../@shared/tests/mock/repository.mock";
import { validUuidFormat } from "../../@shared/tests/stub";
import { DeleteFarm } from "./delete-farm";

describe("Delete farm use case tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return true with valid id", async () => {
    const farmRepository = FarmMockRepository();
    const spyFind = jest.spyOn(farmRepository, "findOneWithRelations");
    const spyDelete = jest.spyOn(farmRepository, "delete");
    const deleted = await new DeleteFarm(
      farmRepository
    ).execute(validUuidFormat());
    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(deleted).toBe(true);
  });
});
