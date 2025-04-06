import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types/AuthRequest";

const httpContext = require("express-http-context");

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    httpContext.set("user", decoded.id);
    (req as AuthRequest).user = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
