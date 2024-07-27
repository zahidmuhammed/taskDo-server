"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const tasks = express_1.default.Router();
const routeName = "tasks";
tasks.get(`/${routeName}`, taskController_1.getTasks);
tasks.post(`/${routeName}`, taskController_1.createTask);
tasks.get(`/${routeName}/:id`, taskController_1.getTask);
tasks.patch(`/${routeName}/:id`, taskController_1.updateTask);
tasks.delete(`/${routeName}/:id`, taskController_1.deleteTask);
exports.default = tasks;
