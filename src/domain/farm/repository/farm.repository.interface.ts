import RepositoryInterface from "../../@shared/repository/repository.interface";
import Farm from "../entity/farm.entity";

export default interface FarmRepositoryInterface
  extends RepositoryInterface<Farm> {
  getAmountFarms(): Promise<AmountFarms>;
  getTotalArea(): Promise<AreaTotalFarms>;
}

export type AmountFarms = {
  amount: string;
}

export type AreaTotalFarms = {
  total: number;
}