import { Express } from "express";
import budgetTypeRouter from "./api/budgetTypeRouter";

export default (app: Express) => {
  // Routes
  app.use("api/budget-type/", budgetTypeRouter)
};
