import { Express, NextFunction, Request, Response } from "express";
import authRouter from "./api/auth";
import userRouter from "./api/user";
import adminRouter from "./api/admin";
import { AuthMiddleware } from "./middlewares/auth";
import { Channel } from "amqplib";

const authMiddleware = new AuthMiddleware();

export default (app: Express, channel: Channel) => {
  // Test routes
  app.get("/", (req: Request, res: Response) => {
    res.send("User service running");
  });

  // store the channel in req
  app.use((req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.channel = channel;
  });

  // Routes
  app.use("/api/auth", authRouter);
  app.use("/api/user", authMiddleware.auth.bind(authMiddleware), userRouter);
  app.use("/api/admin", authMiddleware.auth.bind(authMiddleware), adminRouter);
};
