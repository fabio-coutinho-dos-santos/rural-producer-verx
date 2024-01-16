import RepositoryInterface from "../../@shared/repository/repository.interface";
import Producer from "../entity/producer.entity";

export default interface ProducerRepositoryInterface
  extends RepositoryInterface<Producer> {
  findOneWithRelations(relations: any): Promise<any>;
}
