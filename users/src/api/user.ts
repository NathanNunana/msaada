import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthMiddleware } from "../middlewares/auth";

const userRouter = Router();
const middleware = new AuthMiddleware();
const userController = new UserController();
// Routes
userRouter.put(
  "/update-profile",
  middleware.auth,
  userController.updatedProfile.bind(userController)
);
userRouter.get(
  "/reload",
  middleware.auth,
  userController.readProfile.bind(userController)
);

export default userRouter;
