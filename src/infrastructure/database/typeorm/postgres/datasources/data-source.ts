import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import ProducerEntity from "../entities/producer.entity";
import FarmEntity from "../entities/farms.entity";

export function ormconfig() {
  const config = {
    type: "postgres",
    url: process.env.POSTGRES_URL_CONNECTION,
    entities: [ProducerEntity, FarmEntity],
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  };
  return config;
}

export const AppDataSource = new DataSource(ormconfig() as DataSourceOptions);
