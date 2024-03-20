import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authRouter = Router();
const authController = new AuthController();

// Routes
authRouter.post("/signin", authController.signIn.bind(authController));
authRouter.post("/signup", authController.signUp.bind(authController));

// Route not found
authRouter.all("*");

export default authRouter;
