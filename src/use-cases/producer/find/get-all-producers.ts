import ProducerRepositoryInterface from "../../../domain/producer/repository/producer.repository.interface";
import PaginationMetadata, {
  PaginationMetadataType,
} from "../../../infrastructure/api/resources/@shared/pagination";
import ArrayProducerPresenter from "../../../infrastructure/api/resources/producer/presenter/producer-all.presenter";
import ProducerEntity from "../../../infrastructure/database/typeorm/postgres/entities/producer.entity";

export class GetAllProducer {
  constructor(
    private readonly producerRepository: ProducerRepositoryInterface
  ) {}

  async execute(page: number, pageSize: number) {
    const metadata: PaginationMetadataType =
      await new PaginationMetadata<ProducerEntity>(
        this.producerRepository
      ).buildMetadata(page, pageSize);

    const items: ProducerEntity[] =
      await this.producerRepository.findWithRelations({
        skip: metadata.skip,
        take: metadata.take,
        relations: {
          farms: true,
        },
        order: {
          name: "ASC",
        },
      });

    const producers = new ArrayProducerPresenter(items);
    return {
      ...metadata,
      producers,
    };
  }
}
