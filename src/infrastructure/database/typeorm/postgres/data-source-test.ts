import { DataSource } from "typeorm";
import ProducerEntity from "../entities/producer.entity";
import FarmEntity from "../entities/farms.entity";
import CropEntity from "../entities/crop";

export function ormconfig (): any {
  const config = 
  {
    type: 'sqlite',
    database: ':memory:',
    entities: [
      ProducerEntity,
      FarmEntity,
      CropEntity
    ],
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  }
  return config;
}

export const AppDataSourceTest = new DataSource(ormconfig());