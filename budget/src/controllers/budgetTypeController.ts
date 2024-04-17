import { Request, Response } from "express";
import z from "zod";
import { BudgetTypeService } from "../services/budgetTypeService";

export class BudgetTypeController {
  budgetTypeService: BudgetTypeService;

  constructor() {
    this.budgetTypeService = new BudgetTypeService()
  }

  async createBudget(req: Request, res: Response) {
    const schema = z.object({
      name: z.string(),
      description: z.string()
    }).safeParse(req.body)

    if (!schema.success) {
      return res.status(400).json({
        success: false,
        error: schema.error,
      })
    }
    try {
      const budget = await this.budgetTypeService.saveBudget(schema.data)
      res.status(201).json({
        success: true,
        data: budget,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        success: false,
        error: "internal server error"
      })
    }
  }
  async updateBudget(req: Request, res: Response) {
    const schema = z.object({
      id: z.number(),
      name: z.string(),
      description: z.string()
    }).safeParse(req.body)

    if (!schema.success) {
      return res.status(400).json({
        success: false,
        error: schema.error,
      })
    }

    try {
      const updatedBudget = await this.budgetTypeService.updateBudget(schema.data);
      res.status(200).json({
        success: true,
        data: updatedBudget,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        success: false,
        error: "internal server error"
      })
    }

  }
  async deleteBudget(req: Request, res: Response) {
    const params = z.number().safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({
        succcess: false,
        error: params.error,
      })
    }
    try {
      const id = params.data;
      const budget = await this.budgetTypeService.deleteBudget(id);
      res.status(200).json({
        success: true,
        data: budget
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "internal server error"
      })
    }
  }
  async getBudgets(req: Request, res: Response) {
    try {
      const budgets = await this.budgetTypeService.getBudgets();
      res.status(200).json({
        success: true,
        data: budgets,
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "internal server error"

      })
    }
  }
}
