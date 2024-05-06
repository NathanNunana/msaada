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
const MSG_QUEUE_URL: string =
  (dev ? env["MSG_QUEUE_URL_LOCAL"] : env["MSG_QUEUE_URL"]) ?? "";
const EXCHANGE = "msaada";
const BUDGET_SERVICE = "budget_service";
const USER_SERVICE = "user_service";
const BUDGET_QUEUE = "budget_queue";

export {
  MSG_QUEUE_URL,
  EXCHANGE,
  BUDGET_SERVICE,
  BUDGET_QUEUE,
  USER_SERVICE,
  SECRET_KEY,
};
