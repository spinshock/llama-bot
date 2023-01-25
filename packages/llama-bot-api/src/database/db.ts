import "reflect-metadata";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Emote } from "./entities/Emote.entity";

const getConfig = (): PostgresConnectionOptions => ({
  type: "postgres",
  entities: [Emote],
  url: process.env.DATABASE_URL,
  synchronize: true,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export const AppDataSource = new DataSource(getConfig());

export const initializeDatabase = async () => {
  if (!getConfig().url) {
    throw Error("Provide database connection string");
  }
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
};
