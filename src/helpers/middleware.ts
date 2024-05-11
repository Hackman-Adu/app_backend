import { NextFunction, Request, Response, request } from "express";

import jwt from "jsonwebtoken";

class Middleware {
  public static validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader)
        return res.status(400).json({ message: "Provide token" });
      const requestToken = authHeader?.split(" ")[1];
      if (!requestToken)
        return res.status(400).json({ message: "Provide token" });
      const secret = process.env.JWT_SECRET_TOKEN as string;
      jwt.verify(requestToken, secret, (err, user) => {
        if (err)
          return res.status(401).json({ message: "Invalid or expired token" });
        (request as any).user = user;
        next();
      });
    } catch (error) {
      res.status(403).json({ message: error });
    }
  }
}

export default Middleware;
