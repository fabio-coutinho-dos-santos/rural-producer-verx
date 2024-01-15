import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface"
import { FarmMockRepository } from "../../@shared/tests/mock/repository.mock"
import { amountFarmsStub } from "../../@shared/tests/stub"
import { GetAmountFarms } from "./get-amount-farms"

describe('Get amount farms use case', () => {
  describe('execute function', () => {
    it('should return a amount object with valid data', async () => {
      const farmRepository: FarmRepositoryInterface = FarmMockRepository()
      const amountFarms = await new GetAmountFarms(farmRepository).execute();
      expect(amountFarms).toBeDefined()
      expect(amountFarms).toMatchObject(amountFarmsStub())
    })
  })
})