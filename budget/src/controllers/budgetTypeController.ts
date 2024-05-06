import { Request, Response } from "express";
import z from "zod";
import { BudgetTypeService } from "../services/budgetTypeService";
import { Channel } from "amqplib";
import { MessageBroker } from "../utils/broker";

export class BudgetTypeController {
  budgetTypeService: BudgetTypeService;
  broker: MessageBroker;
  channel: Channel | null;

  constructor(channel: Channel) {
    this.budgetTypeService = new BudgetTypeService();
    this.broker = new MessageBroker();
    this.channel = channel;
  }

  async createBudgetType(req: Request, res: Response) {
    const schema = z
      .object({
        name: z.string(),
        description: z.string(),
      })
      .safeParse(req.body);

    if (!schema.success) {
      return res.status(400).json({
        success: false,
        error: schema.error,
      });
    }
    try {
      const budgetType = await this.budgetTypeService.saveBudgetType(
        schema.data
      );
      res.status(201).json({
        success: true,
        data: budgetType,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: "internal server error",
      });
    }
  }
  async updateBudgetType(req: Request, res: Response) {
    const schema = z
      .object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
      })
      .safeParse(req.body);

    if (!schema.success) {
      return res.status(400).json({
        success: false,
        error: schema.error,
      });
    }

    try {
      const updatedBudgetType = await this.budgetTypeService.updateBudgetType(
        schema.data
      );
      res.status(200).json({
        success: true,
        data: updatedBudgetType,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: "internal server error",
      });
    }
  }
  async deleteBudgetType(req: Request, res: Response) {
    const params = z.number().safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({
        succcess: false,
        error: params.error,
      });
    }
    try {
      const id = params.data;
      const budgetType = await this.budgetTypeService.deleteBudgetType(id);
      res.status(200).json({
        success: true,
        data: budgetType,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "internal server error",
      });
    }
  }
  async getBudgetType(req: Request, res: Response) {
    const params = z.number().safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({
        succcess: false,
        error: params.error,
      });
    }
    try {
      const id = params.data;
      const budgetType = await this.budgetTypeService.getBudgetType(id);
      res.status(200).json({
        success: true,
        data: budgetType,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "internal server error",
      });
    }
  }
  async getBudgetTypes(req: Request, res: Response) {
    try {
      const budgetTypes = await this.budgetTypeService.getBudgetTypes();
      res.status(200).json({
        success: true,
        data: budgetTypes,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "internal server error",
      });
    }
  }
}
