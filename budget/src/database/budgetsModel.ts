import { DataTypes } from "sequelize";
import sequelize from "./dbConfig";

export interface BudgetI {
  id?: number,
  user_id: number,
  budget_type: number,
  description: string,
  amount: number,
  tags: Array<string>,
  notes: string,
  account: string,
}

const Budget = sequelize.define("Budget", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  budget_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY,
  },
  notes: {
    type: DataTypes.STRING,
  },
  account: {
    type: DataTypes.STRING,
  }
});

export default Budget;
