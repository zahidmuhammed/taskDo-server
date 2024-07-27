import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import Task from "../models/Tasks";

const getTasks = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        const tasks = await Task.find({ user_id: user.id });
        res.status(200).json({
            message: "Tasks fetched successfully",
            data: tasks,
        });
    }
);

const createTask = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        console.log("user", user);

        const task = await Task.create({ ...req.body, user_id: user.id });
        res.status(201).json({
            message: "Task created successfully",
            data: task,
        });
    }
);

const getTask = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }
        res.status(200).json({
            message: "Task fetched successfully",
            data: task,
        });
    }
);

const updateTask = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }
        res.status(200).json({
            message: "Task updated successfully",
            data: task,
        });
    }
);

const deleteTask = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Task deleted successfully",
        });
    }
);

export { getTasks, createTask, getTask, updateTask, deleteTask };
