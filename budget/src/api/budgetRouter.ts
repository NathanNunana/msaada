import { Router } from "express";
import { BudgetController } from "../controllers/budgetController";
import { Channel } from "amqplib";

const budgetRouter = Router();

export const routes = (channel: Channel) => {
  const budgetController = new BudgetController(channel);
  // Bind budgetController to each route handler
  budgetRouter.get("/", budgetController.getBudgets);
  budgetRouter.get("/:id", budgetController.getBudget);
  budgetRouter.post("/create", budgetController.createBudget);
  budgetRouter.put("/update", budgetController.updateBudget);
  budgetRouter.delete("/delete", budgetController.deleteBudget);
};

export default budgetRouter;
