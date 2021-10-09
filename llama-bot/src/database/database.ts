import { Sequelize } from "sequelize";

if (!process.env.DATABASE_URL) {
  throw new Error("Provide database connection string.");
}

export default new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});
