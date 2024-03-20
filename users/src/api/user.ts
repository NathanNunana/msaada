import { Router } from "express";

const userRouter = Router();

// Routes 
userRouter.post("/update-profile");
userRouter.post("/reload-user");

export default userRouter;
