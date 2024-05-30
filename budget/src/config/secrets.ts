import { config } from "dotenv";
import { readFileSync } from "fs";

if (readFileSync(".env")) {
  config({ path: ".env" });
}

const dev: boolean = process.env.NODE_ENV === "development";
const env: NodeJS.ProcessEnv = process.env;

// APP SECRET KEY
const SECRET_KEY = process.env.SECRET_KEY;

// MESSAGE BROKER KEYS
const MSG_QUEUE_URL: string = env["MSG_QUEUE_URL"]!;
const EXCHANGE = "msaada";
const BUDGET_SERVICE = "budget_service";
const USER_SERVICE = "user_service";
const BUDGET_QUEUE = "budget_queue";


const DB_USER = env.DB_USER
const DB_PASSWORD = env.DB_PASSWORD
const DB_HOST = env.DB_HOST
const DB_NAME = env.DB_NAME

export {
  MSG_QUEUE_URL,
  EXCHANGE,
  BUDGET_SERVICE,
  BUDGET_QUEUE,
  USER_SERVICE,
  SECRET_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
};
