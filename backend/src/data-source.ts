import "express-async-errors";
import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Client } from "./entities/client.entity";
import { Contact } from "./entities/contact.entity";
import { InitialMigration1680108553673 } from "./migrations/1680108553673-InitialMigration";

const port = process.env.DB_PORT as number | undefined;

const setDataSourceOptions = (): DataSourceOptions => {
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [Client, Contact],
      migrations: [InitialMigration1680108553673],
    };
  }

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [Client, Contact],
    };
  }

  return {
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_DATABASE,
    logging: true,
    synchronize: false,
    entities: [Client, Contact],
    migrations: [InitialMigration1680108553673],
  };
};

const dataSourceOptions = setDataSourceOptions();
export const AppDataSource = new DataSource(dataSourceOptions);
