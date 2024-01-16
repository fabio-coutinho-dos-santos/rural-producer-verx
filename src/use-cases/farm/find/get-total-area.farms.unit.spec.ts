import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";
import { FarmMockRepository } from "../../@shared/tests/mock/repository.mock";
import { totalAreaFarmsStub } from "../../@shared/tests/stub";
import { GetTotalAreaFarms } from "./get-total-area-farms";

describe("Get total area use case", () => {
  describe("execute function", () => {
    it("should return a totalArea object with valid data", async () => {
      const farmRepository: FarmRepositoryInterface = FarmMockRepository();
      const totalAreaFarms = await new GetTotalAreaFarms(
        farmRepository
      ).execute();
      expect(totalAreaFarms).toBeDefined();
      expect(totalAreaFarms).toMatchObject(totalAreaFarmsStub());
    });
  });
});
