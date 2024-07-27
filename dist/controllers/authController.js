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
exports.login = exports.signup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const signup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    const userExists = yield Users_1.default.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield Users_1.default.create({
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
    const token = jsonwebtoken_1.default.sign({ user: userData }, jwtSecret, {
        expiresIn: "30d",
    });
    res.status(201).json({
        message: "Signup successful",
        data: {
            token: token,
            user: userData,
        },
    });
}));
exports.signup = signup;
const login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield Users_1.default.findOne({ email });
    if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
    }
    if (!(yield bcryptjs_1.default.compare(password, user.password))) {
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
    const token = jsonwebtoken_1.default.sign({ user: userData }, jwtSecret, {
        expiresIn: "30d",
    });
    res.status(200).json({
        message: "Login successful",
        data: {
            token,
            user: userData,
        },
    });
}));
exports.login = login;
