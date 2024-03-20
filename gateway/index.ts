import express from "express";
import { config } from "dotenv";
import initializeApp from "./app";

config({ path: ".env" });

const app = express();
const port = process.env.PORT || 3000;

initializeApp(app);

app.listen(port, () => {
  console.log(
    "Server running on http://127.0.0.1:%d in %s mode",
    port,
    process.env.NODE_ENV
  );
});
