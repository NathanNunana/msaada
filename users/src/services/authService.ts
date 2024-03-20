import { BaseService } from "./baseService";
import { User } from "../database/model";

export interface userData {
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  password: string;
}

export class AuthService extends BaseService {
  async createUser(data: userData): Promise<User> {
    const user = await User.create(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        password: data.password,
      }
    );
    return user;
  }
  async getUser(email: string) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      return user;
    } catch (err) {
      console.error(err);
    }
  }
}
