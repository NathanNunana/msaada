import { Express } from "express";
import proxy from "express-http-proxy";

export default (app: Express) => {
  // Proxies
  app.use("/users", proxy("http://127.0.0.1:3001"))
};