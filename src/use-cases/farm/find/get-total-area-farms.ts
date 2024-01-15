import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";

export class GetTotalAreaFarms {
  constructor(private readonly farmRepository: FarmRepositoryInterface) { }

  async execute() {
    const totalAreaFarms = await this.farmRepository.getTotalArea()
    return totalAreaFarms;
  }
}
