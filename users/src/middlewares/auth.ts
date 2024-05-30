import { Request, Response, NextFunction } from "express";
import { BaseController } from "../controllers/baseController";
import { userData } from "../database/userModel";

export class AuthMiddleware extends BaseController {
  auth(req: Request, res: Response, next: NextFunction) {
    const authBearer = req.headers.authorization;
    if (!authBearer) {
      return res.status(401).json({
        success: false,
        error: "unauthorized",
      });
    }
    try {
      const data = this.verifyToken(authBearer)
      // @ts-ignore
      req.user = data;
      next();
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  authRole =
    (roles: Array<string>) =>
      (req: Request, res: Response, next: NextFunction) => {
        const user: userData = this.getUser(req);
        if (!roles.includes(user.role!)) {
          return res.status(401).json({
            success: false,
            error: "unauthorized",
          });
        }
        next();
      };
}
