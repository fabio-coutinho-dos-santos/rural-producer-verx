import { DataSource } from "typeorm";
import 'dotenv/config'
import ProducerModel from "../entities/producer.entity";

export function ormconfig(): any {
  const config = {
    // type: 'postgres',
    // url: process.env.POSTGRES_URL_CONNECTION,
    // entities: [`${__dirname}/../**/entities/*{ts, js}`],
    // synchronize: false,
    // migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    type: 'sqlite',
    // database: './data.sqlite',
    database: ':memory:',
    // entities: [`${__dirname}/../**/entities/*{ts, js}`],
    entities: [ProducerModel],
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  }
  return config;
}

export const AppDataSource = new DataSource(ormconfig());