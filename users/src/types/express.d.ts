import { Channel } from 'amqplib';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: string; // Add your custom property here
    channel?: Channel;
  }
}
