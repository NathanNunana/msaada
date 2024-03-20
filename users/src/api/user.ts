import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthMiddleware } from "../middlewares/auth";

const userRouter = Router();
const userController = new UserController();
const middleware = new AuthMiddleware();

// Routes
userRouter.put(
  "/update-profile",
  userController.updatedProfile.bind(userController)
);
userRouter.get("/load-user", userController.readProfile.bind(userController));

export default userRouter;
