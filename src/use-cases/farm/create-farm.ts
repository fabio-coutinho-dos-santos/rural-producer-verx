import CropRepositoryInterface from "../../domain/crop/repository/crop.repository.interface";
import FarmRepositoryInterface from "../../domain/farm/repository/farm.repository.interface";

export default class CreateFarm {
  constructor(
    private readonly farmRepository: FarmRepositoryInterface,
    private readonly cropRepository: CropRepositoryInterface,
  ) { }

  async execute() {
    return true
  }
}