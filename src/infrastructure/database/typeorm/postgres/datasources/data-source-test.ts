import "dotenv/config";
import { DataSource } from "typeorm";
import ProducerEntity from "../entities/producer.entity";
import FarmEntity from "../entities/farms.entity";

export function ormconfig(): any {
  const config = {
    type: "postgres",
    url: process.env.POSTGRES_TEST_URL_CONNECTION,
    entities: [ProducerEntity, FarmEntity],
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  };
  return config;
}

export const AppDataSourceTest = new DataSource(ormconfig());
