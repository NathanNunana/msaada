import express from "express";
import initializeApp from "./app";
import { MessageBroker } from "./utils/broker";
import type { Channel } from "amqplib";
import { Database } from "./database/db";

const app = express();
const port = process.env.PORT ?? 3002;
const mBroker = new MessageBroker();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== "production") {
  // handle error
}


const startApp = async () => {
  const channel: Channel | null = await mBroker.createChannel();
  if (channel) {
    initializeApp(app, channel);
  }
}

const init = async () => {
  const db = Database.getInstance()
  db.connect().then(() => {
    // db.migrate();
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

