import express from "express";
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask,
} from "../controllers/taskController";

const tasks = express.Router();
const routeName = "tasks";

tasks.get(`/${routeName}`, getTasks);
tasks.post(`/${routeName}`, createTask);
tasks.get(`/${routeName}/:id`, getTask);
tasks.patch(`/${routeName}/:id`, updateTask);
tasks.delete(`/${routeName}/:id`, deleteTask);

export default tasks;
