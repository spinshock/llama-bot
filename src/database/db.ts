import { createConnection } from "typeorm";
import config from "../config/database";

export const startDb = async () => {
  const connection = await createConnection(config);

  return connection;
};
