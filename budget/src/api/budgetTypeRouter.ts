import { Router } from "express";
import { BudgetTypeController } from "../controllers/budgetTypeController";

const budgetTypeRouter = Router();
const budgetTypeController = new BudgetTypeController();

budgetTypeRouter.get("/", budgetTypeController.getBudgets)
budgetTypeRouter.post("/create", budgetTypeController.createBudget)
budgetTypeRouter.put("/update", budgetTypeController.updateBudget)
budgetTypeRouter.delete("/delete", budgetTypeController.deleteBudget)


export default budgetTypeRouter;

