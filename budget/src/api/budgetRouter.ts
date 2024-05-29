import { Request, Response, Router } from "express";
import { BudgetController } from "../controllers/budgetController";

const budgetRouter = Router();
const budgetController = new BudgetController();
// budgetRouter.get("/", budgetController.getBudgets);
// budgetRouter.get("/:id", budgetController.getBudget);
budgetRouter.post("/create", budgetController.createBudget.bind(budgetController));
// budgetRouter.put("/update", budgetController.updateBudget);
// budgetRouter.delete("/delete", budgetController.deleteBudget);

export default budgetRouter;
