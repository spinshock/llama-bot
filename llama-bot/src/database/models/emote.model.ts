import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Emote extends Model {
  declare code: string;
  declare url: string;
  declare count: number;
  declare author: string;
}

export default Emote.init(
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Emote",
  }
);
