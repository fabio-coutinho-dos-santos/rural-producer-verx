import { DataSource } from "typeorm";
import 'dotenv/config'

export function ormconfig(): any {
  const config = {
    type: 'postgres',
    url: process.env.POSTGRES_URL_CONNECTION,
    entities: [`${__dirname}/../**/entities/*{ts, js}`],
    synchronize: false,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  }
  return config;
}

export const AppDataSource = new DataSource(ormconfig());