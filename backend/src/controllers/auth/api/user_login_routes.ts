
import express from "express"
export const user_login_routes = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { models } from "../../../models";
import { Request, Response } from "express";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await models.User.findOne({ where: { email } });
        if (!user)
            return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, tenantId: user.tenantId },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, tenantId: user.tenantId }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

user_login_routes.post("/login", login);