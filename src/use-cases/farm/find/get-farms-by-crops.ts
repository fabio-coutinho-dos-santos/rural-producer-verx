import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";

export class GetFamsGroupedByCrop {
  constructor(private readonly farmRepository: FarmRepositoryInterface) {}

  async execute() {
    const farmsByState = await this.farmRepository.getByCrop();
    return farmsByState;
  }
}
