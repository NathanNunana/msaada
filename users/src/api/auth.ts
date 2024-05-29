import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authRouter = Router();
const authController = new AuthController();
authRouter.post("/signin", authController.signIn.bind(authController));
authRouter.post("/signup", authController.signUp.bind(authController));
authRouter.all("*");
export default authRouter;
