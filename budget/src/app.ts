import { Express, Request, Response } from "express";
import typesRoutes from "./api/budgetTypeRouter";
import routes from "./api/budgetRouter";
import type { Channel } from "amqplib";

export default (app: Express, channel: Channel) => {
  // init channel for routers
  const budgetTypeRouter = typesRoutes(channel);
  const budgetRouter = routes(channel);

  // endpoint check
  app.get("/", (req: Request, res: Response) => {
    res.send("Budget service running");
  });

  // Routes
  app.use("/api/budget-type", budgetTypeRouter);
  app.use("/api/budget", budgetRouter);
};
