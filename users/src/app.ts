import { Express, Request, Response } from "express";
import authRouter from "./api/auth";
import userRouter from "./api/user";
import adminRouter from "./api/admin";
import { AuthMiddleware } from "./middlewares/auth";

const authMiddleware = new AuthMiddleware();

export default (app: Express) => {
  // Test routes
  app.get("/", (req: Request, res: Response) => {
    res.send("User service running");
  });

  // Routes
  app.use("/api/auth", authRouter);
  app.use("/api/user", authMiddleware.auth.bind(authMiddleware), userRouter);
  app.use("/api/admin", authMiddleware.auth.bind(authMiddleware), adminRouter);
};
