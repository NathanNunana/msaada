import { Express, Request, Response } from "express";
import budgetRouter from "./api/budgetRouter";

export default (app: Express) => {
  // endpoint check
  app.get("/", (req: Request, res: Response) => {
    res.send("Budget service running");
  });

  // Routes
  app.use("/api/budget", budgetRouter);
};
