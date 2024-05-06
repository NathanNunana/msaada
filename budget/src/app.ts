import { Express, Request, Response } from "express";
import budgetTypeRouter, {typesRoutes} from "./api/budgetTypeRouter";
import budgetRouter, {routes} from "./api/budgetRouter";
import { Channel } from "amqplib";

export default (app: Express, channel: Channel) => {
  // init channel for routers
  typesRoutes(channel);
  routes(channel);

  // endpoint check
  app.get("/", (req: Request, res: Response) => {
    res.send("Budget service running");
  });


  // Routes
  app.use("/api/budget-type", budgetTypeRouter)
  app.use("/api/budget", budgetRouter)
};
