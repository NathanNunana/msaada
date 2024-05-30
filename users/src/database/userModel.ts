import { DataTypes, Model } from "@sequelize/core";
import { Database } from "./db";

const db = Database.getInstance();

export interface userData {
  id?: number,
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  password: string;
}

export enum ROLE {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export class User extends Model {
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare role: ROLE;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(ROLE.CUSTOMER, ROLE.ADMIN),
      defaultValue: ROLE.CUSTOMER,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db.getSequelize(),
    modelName: "User",
    timestamps: true,
  }
);

