import { Request, Response } from "express";
import z from "zod";
import { BudgetService } from "../services/budgetService";
import { MessageBroker } from "../utils/broker";

export class BudgetController {
  private budgetService: BudgetService;
  private broker: MessageBroker;

  constructor() {
    this.budgetService = new BudgetService();
    this.broker = new MessageBroker();
  }

  async createBudget(req: Request, res: Response) {
    console.log("Creating Budget")
    const schema = z
      .object({
        user_id: z.number(),
        budget_type: z.number(),
        description: z.string(),
        amount: z.number(),
        tags: z.string(),
        notes: z.string(),
        account: z.string(),
      })
      .safeParse(req.body);

    if (!schema.success) {
      return res.status(400).json({
        success: false,
        error: schema.error,
      });
    }
    try {
      // @ts-ignore
      // const channel = req.channel;

      // console.log(this.channel)
      // if (channel) {
      //   return res.send("null message channel");
      // }
      // this.broker.subscribeMessage(channel);
      const budget = await this.budgetService.saveBudget(schema.data);
      res.status(201).json({
        success: true,
        data: budget,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: "internal server error",
      });
    }
  }
  async updateBudget(req: Request, res: Response) {
    const schema = z
      .object({
        user_id: z.number(),
        budget_type: z.number(),
        description: z.string(),
        amount: z.number(),
        tags: z.string(),
        notes: z.string(),
        account: z.string(),
      })
      .safeParse(req.body);

    if (!schema.success) {
      return res.status(400).json({
        success: false,
        error: schema.error,
      });
    }

    try {
      const updatedBudget = await this.budgetService.updateBudget(schema.data);
      res.status(200).json({
        success: true,
        data: updatedBudget,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: "internal server error",
      });
    }
  }
  async deleteBudget(req: Request, res: Response) {
    const params = z.number().safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({
        succcess: false,
        error: params.error,
      });
    }
    try {
      const id = params.data;
      const budget = await this.budgetService.deleteBudget(id);
      res.status(200).json({
        success: true,
        data: budget,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "internal server error",
      });
    }
  }
  async getBudget(req: Request, res: Response) {
    const params = z.number().safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({
        succcess: false,
        error: params.error,
      });
    }
    try {
      const id = params.data;
      const budgets = await this.budgetService.getBudget(id);
      res.status(200).json({
        success: true,
        data: budgets,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "internal server error",
      });
    }
  }
  async getBudgets(req: Request, res: Response) {
    try {
      const budgets = await this.budgetService.getBudgets();
      res.status(200).json({
        success: true,
        data: budgets,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "internal server error",
      });
    }
  }
}
