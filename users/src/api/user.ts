import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthMiddleware } from "../middlewares/auth";
import { Channel } from "amqplib";

const userRouter = Router();
const middleware = new AuthMiddleware();

export const userRoutes = (channel: Channel) => {
  const userController = new UserController(channel);
  // Routes
  userRouter.put(
    "/update-profile",
    userController.updatedProfile.bind(userController)
  );
  userRouter.get("/reload", userController.readProfile.bind(userController));
}

export default userRouter;
