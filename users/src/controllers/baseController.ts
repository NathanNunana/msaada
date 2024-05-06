import { SECRET_KEY } from "../config/secrets";
import { verify, sign } from "jsonwebtoken";
import { hashSync, compareSync }  from "bcrypt";
import { userData } from "../database/userModel";

export class BaseController {
  getUser(req: any): userData {
    return req.user as userData;
  }

  genToken(payload: userData){
    return sign(payload, SECRET_KEY);
  }

  verifyToken(authBearer: string): any {
    const token = authBearer.slice("Bearer ".length);
    const jwt = verify(token, SECRET_KEY);
    return jwt;
  }

  hash(password: string): string {
    return hashSync(password, 10);
  }

  compareHash(data: string, hash: string): boolean {
    return compareSync(data, hash);
  }
}
