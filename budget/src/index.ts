import express from "express";
import initializeApp from "./app";
import { Database } from "./database/db";

const app = express();
const port = process.env.PORT ?? 3002;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== "production") {
  // handle error
}

const startApp = async () => {
  initializeApp(app);
}

const init = async () => {
  const db = Database.getInstance()
  db.connect().then(() => {
    db.migrate();
    startApp()
  })

}

app.listen(port, () => {
  console.log(
    "Server running on http://127.0.0.1:%d in %s mode",
    port,
    process.env.NODE_ENV
  );
  init();
});

