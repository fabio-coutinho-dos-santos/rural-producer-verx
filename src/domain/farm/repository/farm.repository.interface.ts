import FarmEntity from "../../../infrastructure/database/typeorm/postgres/entities/farms.entity";
import RepositoryInterface from "../../@shared/repository/repository.interface";
import Farm from "../entity/farm.entity";

export default interface FarmRepositoryInterface
  extends RepositoryInterface<FarmEntity> {
  create(farm: Farm): Promise<FarmEntity>
  getAmountFarms(): Promise<AmountFarms>;
  getTotalArea(): Promise<AreaTotalFarms>;
  getByState(): Promise<FarmsByState[]>;
  getByCrop(): Promise<FarmsByCrop[]>;
}

export type AmountFarms = {
  amount: string;
};

export type AreaTotalFarms = {
  total: number;
  arable: number;
  vegetation: number;
};

export type FarmsByState = {
  amount: number;
  state: string;
};

export type FarmsByCrop = {
  amount: number;
  crop: string;
}
