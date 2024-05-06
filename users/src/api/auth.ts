import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { Channel } from "amqplib";

const authRouter = Router();

export const authRoutes = (channel: Channel) => {
  const authController = new AuthController(channel);
  // Routes
  authRouter.post("/signin", authController.signIn.bind(authController));
  authRouter.post("/signup", authController.signUp.bind(authController));
  
  // Route not found
  authRouter.all("*");
} 

export default authRouter;
