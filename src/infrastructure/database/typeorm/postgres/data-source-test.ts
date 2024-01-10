import { DataSource } from "typeorm";
import AuthorModel from "../entities/author.entity";

export function ormconfig (): any {
  const config = {
    type: 'sqlite',
    // database: './data.sqlite',
    database: ':memory:',
    entities: [AuthorModel],
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  }
  return config;
}

export const AppDataSourceTest = new DataSource(ormconfig());