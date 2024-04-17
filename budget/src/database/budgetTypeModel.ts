import { DataTypes } from "sequelize";
import sequelize from "./dbConfig";

export interface BudgetTypeI {
  id?: number,
  name: string,
  description: string
}

const BudgetType = sequelize.define("BudgetType", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default BudgetType;
