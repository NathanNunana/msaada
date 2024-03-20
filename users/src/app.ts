import { Express } from "express";
import authRouter from "./api/auth";
import userRouter from "./api/user";
import adminRouter from "./api/admin";
import { AuthMiddleware } from "./middlewares/auth";

const authMiddleware = new AuthMiddleware();

export default (app: Express) => {
  // Routes
  app.use("/api/auth", authRouter);
  app.use("/api/user", authMiddleware.auth, userRouter);
  app.use("/api/admin", authMiddleware.auth, adminRouter);
};
