import ProducerRepositoryInterface from "../../../domain/producer/repository/producer.repository.interface";

export class GetProducerById {
  constructor(
    private readonly producerRepository: ProducerRepositoryInterface
  ) {}

  async execute(producerId: string) {
    const producerStored = await this.producerRepository.findOneWithRelations({
      where: {
        id: producerId,
      },
      relations: {
        farms: true,
      },
    });
    return producerStored;
  }
}
