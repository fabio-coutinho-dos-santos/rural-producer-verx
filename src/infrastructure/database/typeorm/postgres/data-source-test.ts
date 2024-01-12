import { DataSource } from "typeorm";
import ProducerModel from "../entities/producer.entity";

export function ormconfig (): any {
  const config = {
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

export const AppDataSourceTest = new DataSource(ormconfig());