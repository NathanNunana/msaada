import express from "express";
import initializeApp from "./app";
import sequelize from "./database/dbConfig";
import { MessageBroker } from "./utils/broker";
import dbSync from "./database/dbSync";
import { Channel } from "amqplib";

const app = express();
const port = process.env.PORT ?? 3002;
const mBroker = new MessageBroker();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== "production") {
  // handle error
}


const initMessageBroker = async () => {
  const channel:Channel | null = await mBroker.createChannel();
  if (channel) {
    initializeApp(app, channel);
  }
}


const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established and synced successfully.");
    await dbSync;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.listen(port, () => {
  console.log(
    "Server running on http://127.0.0.1:%d in %s mode",
    port,
    process.env.NODE_ENV
  );
  initDB();
  initMessageBroker();
});

