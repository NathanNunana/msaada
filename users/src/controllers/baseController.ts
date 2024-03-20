import { SECRET_KEY } from "../config/secrets";
import { userData } from "../services/authService";
import { JwtPayload, verify, sign } from "jsonwebtoken";
import { hashSync, compareSync }  from "bcrypt";

export class BaseController {
  getUser(req: any): userData {
    return req.user as userData;
  }

  genToken(payload: userData){
    return sign(payload, SECRET_KEY)
  }

  verifyToken(authBearer: string): string | JwtPayload {
    const token = authBearer.slice("Bearer ".length);
    const verifiedToken = verify(token, SECRET_KEY);
    return verifiedToken;
  }

  hash(password: string): string {
    return hashSync(password, 10);
  }

  compareHash(data: string, hash: string): boolean {
    console.log(data, hash);
    return compareSync(data, hash);
  }
}
