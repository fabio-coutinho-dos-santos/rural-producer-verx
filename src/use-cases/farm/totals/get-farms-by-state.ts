import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";

export class GetFamsGroupedByState {
  constructor(private readonly farmRepository: FarmRepositoryInterface) {}

  async execute() {
    const farmsByState = await this.farmRepository.getByState();
    return farmsByState;
  }
}
