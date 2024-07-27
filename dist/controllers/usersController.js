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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Users_1 = __importDefault(require("../models/Users"));
const getUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users_1.default.find();
    res.status(200).json({
        message: "Users fetched successfully",
        data: users,
    });
}));
exports.getUsers = getUsers;
const getUserById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.default.findById(req.params.id);
    res.status(200).json({
        message: "User fetched successfully",
        data: user,
    });
}));
exports.getUserById = getUserById;
const updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield Users_1.default.findByIdAndUpdate(req.params.id, { name, email, password }, {
        new: true,
    });
    res.status(200).json({
        message: "User updated successfully",
        data: user,
    });
}));
exports.updateUser = updateUser;
const deleteUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Users_1.default.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "User deleted successfully",
    });
}));
exports.deleteUser = deleteUser;
