import { Express, Request, Response } from "express";
import budgetTypeRouter from "./api/budgetTypeRouter";
import budgetRouter from "./api/budgetRouter";
import type { Channel } from "amqplib";

export default (app: Express, channel: Channel) => {
  // endpoint check
  app.get("/", (req: Request, res: Response) => {
    res.send("Budget service running");
  });

  // app.use((req: Request, res: Response) => {
  //   // @ts-ignore
  //   req.channel = channel;
  // })

  // Routes
  // app.use("/api/budget-type", budgetTypeRouter);
  app.use("/api/budget", budgetRouter);
};
