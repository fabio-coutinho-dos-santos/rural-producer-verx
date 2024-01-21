import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";
import { FarmMockRepository } from "../../@shared/tests/mock/repository.mock";
import { totalFarmsGroupedByStateStub } from "../../@shared/tests/stub";
import { GetFamsGroupedByState } from "./get-farms-by-state";

describe("Get farms grouped by state", () => {
  describe("execute function", () => {
    it("should return an array", async () => {
      const farmRepository: FarmRepositoryInterface = FarmMockRepository();
      const spyRepository = jest.spyOn(farmRepository, "getByState");
      const amountFarms = await new GetFamsGroupedByState(
        farmRepository
      ).execute();
      expect(amountFarms).toBeDefined();
      expect(amountFarms).toEqual(totalFarmsGroupedByStateStub());
      expect(spyRepository).toHaveBeenCalledTimes(1);
    });
  });
});
