import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";
import { FarmMockRepository } from "../../@shared/tests/mock/repository.mock";
import { totalFarmsGroupedByCropStub } from "../../@shared/tests/stub";
import { GetFamsGroupedByCrop } from "./get-farms-by-crops";

describe("Get farms grouped by crop", () => {
  describe("execute function", () => {
    it("should return an array", async () => {
      const farmRepository: FarmRepositoryInterface = FarmMockRepository(); 
      const spyRepository = jest.spyOn(farmRepository, "getByCrop");
      const amountFarms = await new GetFamsGroupedByCrop(
        farmRepository
      ).execute();
      expect(amountFarms).toBeDefined();
      expect(amountFarms).toEqual(totalFarmsGroupedByCropStub());
      expect(spyRepository).toHaveBeenCalledTimes(1);
    });
  });
});
