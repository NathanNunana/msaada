import { Router } from "express";
import { BudgetTypeController } from "../controllers/budgetTypeController";
import { Channel } from "amqplib";

export const typesRoutes = (channel: Channel) => {
  const budgetTypeRouter = Router();
  const budgetTypeController = new BudgetTypeController(channel);
  budgetTypeRouter.get("/", budgetTypeController.getBudgetTypes);
  budgetTypeRouter.get("/:id", budgetTypeController.getBudgetType);
  budgetTypeRouter.post("/create", budgetTypeController.createBudgetType);
  budgetTypeRouter.put("/update", budgetTypeController.updateBudgetType);
  budgetTypeRouter.delete("/delete", budgetTypeController.deleteBudgetType);
  return budgetTypeRouter;
};

export default typesRoutes;
