import { AppDataSource } from "./typeorm/postgres/datasources/data-source";
import { AppDataSourceTest } from "./typeorm/postgres/datasources/data-source-test";
import("dotenv/config");

export const getDataSource = () => {
  if (process.env.NODE_ENV === "test") {
    return AppDataSourceTest;
  } else {
    return AppDataSource;
  }
};
