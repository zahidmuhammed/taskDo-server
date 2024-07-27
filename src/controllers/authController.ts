import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/Users";

const signup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign({ user: userData }, jwtSecret, {
            expiresIn: "30d",
        });

        res.status(201).json({
            message: "Signup successful",
            data: {
                token: token,
                user: userData,
            },
        });
    }
);

const login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        if (!(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign({ user: userData }, jwtSecret, {
            expiresIn: "30d",
        });

        res.status(200).json({
            message: "Login successful",
            data: {
                token,
                user: userData,
            },
        });
    }
);

export { signup, login };
