import { DeleteResult } from "typeorm";
import {
  NotFoundError,
} from "../../../infrastructure/api/helpers/ApiErrors";
import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";

export class DeleteFarm {
  constructor(private readonly farmRepository: FarmRepositoryInterface) {}

  async execute(farmId: string) {
    const farmStored = await this.farmRepository.findOneWithRelations({
      where: {
        id: farmId,
      },
    });

    if (!farmStored) {
      throw new NotFoundError("Farm not found");
    }

    const result: DeleteResult = await this.farmRepository.delete(farmId);

    const affected = result.affected;
    let deleted = false;

    if (affected) {
      deleted = affected.valueOf() > 0;
    }

    return deleted;
  }
}
