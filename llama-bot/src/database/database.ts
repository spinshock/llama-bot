import { Sequelize } from "sequelize";
import AppConfig from "../config";

export default new Sequelize(AppConfig.databaseUrl, {
  dialect: "postgres",
});
