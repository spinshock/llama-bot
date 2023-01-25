import { Sequelize } from "sequelize";
import AppConfig from "../config";

const sequelize = new Sequelize(AppConfig.databaseUrl, {
  dialect: "postgres",
});
sequelize
  .sync()
  .then(() => console.log("DB Synced"))
  .catch((syncErr) => console.error("DB SYNC ERROR", syncErr));

export default sequelize;
