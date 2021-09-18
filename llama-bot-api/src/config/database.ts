import { ConnectionOptions } from "typeorm";
import { Emote } from "../database/entities/Emote.entity";

let config: ConnectionOptions = {
  type: "postgres",
  entities: [Emote],
  synchronize: true,
  ssl: { rejectUnauthorized: false },
};

if (process.env.DATABASE_URL) {
  config = { ...config, url: process.env.DATABASE_URL };
} else {
  config = {
    ...config,
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "arcen899",
    database: "ttv_emotes_discord_bot",
    ssl: false,
  };
}

export default config;
