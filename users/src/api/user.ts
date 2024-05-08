import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthMiddleware } from "../middlewares/auth";
import { Channel } from "amqplib";

export const userRoutes = (channel: Channel) => {
  const userRouter = Router();
  const middleware = new AuthMiddleware();
  const userController = new UserController(channel);
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
  return userRouter;
};

export default userRoutes;
