import { Sequelize } from "sequelize";
// import { SqliteDialect  } from "@sequeli"

export class Database {
  private sequelize: Sequelize;
  private static instance: Database;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "budget.sqlite",
    })
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }

  async connect() {
    try {
      await this.sequelize.authenticate();

      await this.sequelize.sync({ alter: true })

      console.log("Connected to db successfully");
    } catch (err) {
      console.log("Unable to connect to database", err);
    }
  }

  async migrate() {
    try {
      await this.sequelize.sync({ alter: true })
      console.log("Database migrated successfully")
    } catch (err) {
      console.log("Failed to migrate database schema", err)
    }
  }
}
