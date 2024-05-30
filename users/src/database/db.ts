import { Sequelize } from "@sequelize/core";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "../config/secrets";
import { PostgresDialect } from "@sequelize/postgres";
import { Client } from "pg";

export class Database {
  private sequelize: Sequelize;
  private static instance: Database

  constructor() {
    this.sequelize = new Sequelize({
      dialect: PostgresDialect,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: 5432,
      clientMinMessages: 'notice'
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

  private async createDatabaseIfNotExists() {
    try {
      const client = new Client({
        user: DB_USER,
        host: DB_HOST,
        password: DB_PASSWORD,
        port: 5432,
      });

      await client.connect();

      const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [DB_NAME]);
      if (res.rowCount === 0) {
        await client.query(`CREATE DATABASE "${DB_NAME}"`);
        console.log(`Database ${DB_NAME} created successfully`);
      } else {
        console.log(`Database ${DB_NAME} already exists`);
      }

      await client.end();
    } catch (err) {
      console.error("Error creating database", err);
      throw err;
    }
  }

  async connect() {
    try {
      await this.createDatabaseIfNotExists();
      await this.sequelize.authenticate();
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
