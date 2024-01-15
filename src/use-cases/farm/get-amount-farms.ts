import FarmRepositoryInterface from "../../domain/farm/repository/farm.repository.interface";

export class GetAmountFarms {
  constructor(private readonly farmRepository: FarmRepositoryInterface) { }

  async execute() {
    const amountFarms = await this.farmRepository.getAmountFarms()
    return amountFarms;
  }
}
