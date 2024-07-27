"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getTasks = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Tasks_1 = __importDefault(require("../models/Tasks"));
const getTasks = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const tasks = yield Tasks_1.default.find({ user_id: user.id });
    res.status(200).json({
        message: "Tasks fetched successfully",
        data: tasks,
    });
}));
exports.getTasks = getTasks;
const createTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log("user", user);
    const task = yield Tasks_1.default.create(Object.assign(Object.assign({}, req.body), { user_id: user.id }));
    res.status(201).json({
        message: "Task created successfully",
        data: task,
    });
}));
exports.createTask = createTask;
const getTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Tasks_1.default.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    res.status(200).json({
        message: "Task fetched successfully",
        data: task,
    });
}));
exports.getTask = getTask;
const updateTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Tasks_1.default.findByIdAndUpdate(req.params.id, req.body, {
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
}));
exports.updateTask = updateTask;
const deleteTask = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Tasks_1.default.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "Task deleted successfully",
    });
}));
exports.deleteTask = deleteTask;
