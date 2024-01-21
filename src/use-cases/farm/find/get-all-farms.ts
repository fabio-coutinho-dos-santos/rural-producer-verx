import FarmRepositoryInterface from "../../../domain/farm/repository/farm.repository.interface";
import PaginationMetadata, {
  PaginationMetadataType,
} from "../../../infrastructure/api/resources/@shared/pagination";
import FarmPresenter from "../../../infrastructure/api/resources/farm/presenter/farm.presenter";
import FarmEntity from "../../../infrastructure/database/typeorm/postgres/entities/farms.entity";

export class GetAllFarms {
  constructor(private readonly farmRepostiory: FarmRepositoryInterface) {}

  async execute(page: number, pageSize: number) {
    const metadata: PaginationMetadataType =
      await new PaginationMetadata<FarmEntity>(
        this.farmRepostiory
      ).buildMetadata(page, pageSize);

    const items: FarmEntity[] = await this.farmRepostiory.findWithRelations({
      skip: metadata.skip,
      take: metadata.take,
      relations: {
        producer: true,
      },
      order: {
        name: "ASC",
      },
    });

    const farms = new FarmPresenter(items);
    return {
      ...metadata,
      farms,
    };
  }
}
