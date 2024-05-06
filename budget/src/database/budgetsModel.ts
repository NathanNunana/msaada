import { DataTypes } from "sequelize";
import sequelize from "./dbConfig";

export interface BudgetI {
  id?: number,
  user_id: number,
  budget_type: number,
  description: string,
  amount: number,
  tags: string, // Change the data type to string
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
    type: DataTypes.STRING, // Change the data type to STRING
    allowNull: false, // Make sure tags cannot be null
    get() {
      const rawValue = this.getDataValue('tags');
      if (!rawValue) {
        return [];
      }
      return JSON.parse(rawValue);
    },
    set(value) {
      this.setDataValue('tags', JSON.stringify(value));
    }
  },
  notes: {
    type: DataTypes.STRING,
  },
  account: {
    type: DataTypes.STRING,
  }
});

export default Budget;
