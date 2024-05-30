import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: string; // Add your custom property here
    }
  }
}

export { }
