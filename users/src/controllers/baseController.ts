import { SECRET_KEY } from "../config/secrets";
import { verify, sign } from "jsonwebtoken";
import bcrypt, { hashSync, compareSync } from "bcrypt";
import { userData } from "../database/userModel";

export class BaseController {
  getUser(req: any): userData {
    return req.user as userData;
  }

  genToken(payload: userData) {
    return sign(payload, SECRET_KEY);
  }

  verifyToken(authBearer: string): any {
    const token = authBearer.slice("Bearer ".length);
    const jwt = verify(token, SECRET_KEY);
    return jwt;
  }

  hash(password: string): string | null {
    try {
      return password
      // return bcrypt.hashSync(password, 10);
    } catch (err) {
      console.log("Failed to hash password", err)
      return null
    }
  }

  compareHash(data: string, hash: string): boolean {
    return compareSync(data, hash);
  }
}
