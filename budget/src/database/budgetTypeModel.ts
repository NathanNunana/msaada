import { DataTypes, Model } from "@sequelize/core";
import { Database } from "./db";

const db = Database.getInstance();

export interface BudgetTypeI {
  id?: number,
  name: string,
  description: string
}

export class BudgetType extends Model {
  declare name: string
  declare description: string
}

BudgetType.init({
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,

  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: db.getSequelize(),
  modelName: "BudgetType",
  timestamps: true,
});

