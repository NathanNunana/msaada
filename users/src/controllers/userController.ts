import type { Channel } from "amqplib";
import logger from "../config/logger";
import { UserService } from "../services/userService";
import { BaseController } from "./baseController";
import { Request, Response } from "express";
import z from "zod";

export class UserController extends BaseController {
  userService: UserService;
  channel: Channel;

  constructor(channel: Channel) {
    super();
    this.userService = new UserService();
    this.channel = channel;
  }

  async readProfile(req: Request, res: Response) {
    const user = this.getUser(req);
    try {
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch(err) {
      res.status(500).send("internal server error")
    }
  }
  async updatedProfile(req: Request, res: Response) {
    const user = this.getUser(req);
    const schema = z.object({
      firstName: z.string(),
      lastName: z.string(),
    });
    const resp = schema.safeParse(req.body);
    if (!resp.success) {
      return res.status(400).json({
        success: false,
        error: resp.error,
      });
    }
    try {
      const updatedUser = await this.userService.updateUser(resp.data, user.id!);
      logger.log("info", `user, with id ${user.id} updated profile`);
      res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (err) {
      res.status(500).send("internal server error")
    }
  }
}
