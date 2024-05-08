import { Router } from "express";
import { BudgetController } from "../controllers/budgetController";
import type { Channel } from "amqplib";

export const routes = (channel: Channel) => {
  const budgetRouter = Router();
  // console.log(channel)
  const budgetController = new BudgetController(channel);
  budgetRouter.get("/", budgetController.getBudgets);
  budgetRouter.get("/:id", budgetController.getBudget);
  budgetRouter.post("/create", budgetController.createBudget);
  budgetRouter.put("/update", budgetController.updateBudget);
  budgetRouter.delete("/delete", budgetController.deleteBudget);
  return budgetRouter;
};

export default routes;
