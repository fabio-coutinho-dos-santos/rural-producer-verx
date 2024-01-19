import ProducerEntity from "../../../infrastructure/database/typeorm/postgres/entities/producer.entity";
import RepositoryInterface from "../../@shared/repository/repository.interface";
import Producer from "../entity/producer.entity";

export default interface ProducerRepositoryInterface
  extends RepositoryInterface<ProducerEntity> {
    create(entity: Producer): Promise<ProducerEntity>
    findOneWithRelations(relations: unknown): Promise<ProducerEntity | null>;
}
