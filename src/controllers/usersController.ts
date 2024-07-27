import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import User from "../models/Users";

const getUsers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const users = await User.find();
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    }
);

const getUserById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            message: "User fetched successfully",
            data: user,
        });
    }
);

const updateUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            {
                new: true,
            }
        );
        res.status(200).json({
            message: "User updated successfully",
            data: user,
        });
    }
);

const deleteUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "User deleted successfully",
        });
    }
);

export { getUsers, getUserById, updateUser, deleteUser };
