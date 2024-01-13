import { DataSource } from "typeorm";
import 'dotenv/config'
import ProducerEntity from "../entities/producer.entity";
import FarmEntity from "../entities/farms.entity";

export function ormconfig(): any {
  const config = {
    type: 'postgres',
    url: process.env.POSTGRES_URL_LOCAL,
    // entities: [`${__dirname}/../**/entities/*{ts, js}`],
    entities: [
      ProducerEntity,
      FarmEntity,
    ],
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  }
  return config;
}

export const AppDataSource = new DataSource(ormconfig());