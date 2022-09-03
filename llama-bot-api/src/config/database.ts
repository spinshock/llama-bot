import { ConnectionOptions } from "typeorm";
import { Emote } from "../database/entities/Emote.entity";

let config: ConnectionOptions;

if (process.env.DATABASE_URL) {
  config = {
    type: "postgres",
    entities: [Emote],
    url: process.env.DATABASE_URL,
    synchronize: true,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  };
} else {
  throw Error("Provide database connection string");
}

export default config;
