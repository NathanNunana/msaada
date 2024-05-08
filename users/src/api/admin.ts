import { Channel } from "amqplib";
import { Router } from "express";

export const adminRoutes = (channel: Channel) => {
  const adminRouter = Router();
  return adminRouter;
};

export default adminRoutes;
