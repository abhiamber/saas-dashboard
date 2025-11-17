import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config();

export const withAuthMiddleWare = (req:Request , res:Response, next:NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const jwtSecret = process.env.JWT_SECRET || '';
    const decoded = jwt.verify(token, jwtSecret);
    req.body.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
