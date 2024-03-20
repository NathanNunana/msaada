import { config } from "dotenv";
import { readFileSync } from "fs";

if (readFileSync(".env")) {
  
  config({ path: ".env" });
}

const dev: boolean = process.env.NODE_ENV === "development";
const env: NodeJS.ProcessEnv = process.env;

// APP SECRET KEY
const SECRET_KEY=process.env.SECRET_KEY || "";

// MESSAGE BROKER KEYS
const MSG_QUEUE_URL: string = dev
  ? env["MSG_QUEUE_URL_LOCAL"] || ""
  : env["MSG_QUEUE_URL"] || "";
const EXCHANGE = "FIN-APP";
const USER_SERVICE = "transaction_service";

export { MSG_QUEUE_URL, EXCHANGE, USER_SERVICE, SECRET_KEY };
