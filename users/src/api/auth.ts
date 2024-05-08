import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { Channel } from "amqplib";


export const authRoutes = (channel: Channel) => {
  const authRouter = Router();
  const authController = new AuthController(channel);
  authRouter.post("/signin", authController.signIn.bind(authController));
  authRouter.post("/signup", authController.signUp.bind(authController));
  
  authRouter.all("*");

  return authRouter;
} 

export default authRoutes;
