import { Express, Request, Response } from "express";
import authRouter, { authRoutes } from "./api/auth";
import userRouter, { userRoutes } from "./api/user";
import adminRouter, { adminRoutes } from "./api/admin";
import { AuthMiddleware } from "./middlewares/auth";
import { Channel } from "amqplib";

const authMiddleware = new AuthMiddleware();

export default (app: Express, channel: Channel) => {
  authRoutes(channel);
  userRoutes(channel);
  adminRoutes(channel);

  app.get("/", (req: Request, res: Response) => {
    res.send("User service running");
  });
  
  // Routes
  app.use("/api/auth", authRouter);
  app.use("/api/user", authMiddleware.auth.bind(authMiddleware), userRouter);
  app.use("/api/admin", authMiddleware.auth.bind(authMiddleware), adminRouter);
};
