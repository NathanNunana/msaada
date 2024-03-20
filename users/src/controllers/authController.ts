import { BaseController } from "./baseController";
import { z } from "zod";
import { Request, Response } from "express";
import { emailRegEx, passwordRegEx } from "../utils/constants";
import { AuthService, userData } from "../services/authService";

export class AuthController extends BaseController {
  authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  async signIn(req: Request, res: Response) {
    const schema = z.object({
      email: z.string().regex(RegExp(emailRegEx), "invalid email address"),
      password: z
        .string()
        .regex(
          RegExp(passwordRegEx),
          "Your password must be at least 8 characters long and include a combination of the following:\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one special character (e.g., !@#$%^&*)\n- At least one number"
        ),
    });

    const resp = schema.safeParse(req.body);

    if (!resp.success) {
      return res.status(400).json({
        success: false,
        error: resp.error,
      });
    }
    try {
      const user = await this.authService.getUser(resp.data.email);
      if (!user) {
        return res.status(404).json({
          success: false,
          data: "something went wrong",
        });
      }
      const validPassword: boolean = this.compareHash(
        resp.data.password,
        user.dataValues.password
        );
      if (!validPassword) {
        return res.status(400).json({
          success: false,
          data: "invalid credentials",
        });
      }
      const token = this.genToken(user.dataValues)
      const userData = {
        user,
        token: token,
      };
      res.status(200).json({
        success: true,
        data: userData,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async signUp(req: Request, res: Response) {
    const schema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().regex(RegExp(emailRegEx), "invalid email address"),
      password: z
        .string()
        .regex(
          RegExp(passwordRegEx),
          "Your password must be at least 8 characters long and include a combination of the following:\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one special character (e.g., !@#$%^&*)\n- At least one number"
        ),
    });
    const resp = schema.safeParse(req.body);

    if (!resp.success) {
      return res.status(400).json({
        success: false,
        error: resp.error,
      });
    }
    try {
      let user = await this.authService.getUser(resp.data.email);
      if (user) {
        return res.status(400).json({
          success: false,
          data: "user already exists",
        });
      }
      const userData: userData = resp.data;
      userData.password = this.hash(userData.password);
      user = await this.authService.createUser(userData);
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
