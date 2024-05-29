import { DataTypes, Model } from "sequelize";
import { Database } from "./db";

const db = Database.getInstance();

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

export class Budget extends Model {
  declare user_id: string;
  declare budget_type: number;
  declare description: string;
  declare amount: number;
  declare tags: string;
  declare notes: string;
  declare account: string;
}

Budget.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
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
  }, {
  sequelize: db.getSequelize(),
  modelName: "Budget",
  timestamps: true,
});

