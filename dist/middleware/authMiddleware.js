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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const routesAndPermissions_1 = require("../constants/routesAndPermissions");
const getPermission = (req, role) => {
    var _a, _b;
    const path = req.originalUrl.split("/")[2];
    const method = req.method.toLowerCase();
    return (_b = (_a = routesAndPermissions_1.RoutesAndPermissions[role]) === null || _a === void 0 ? void 0 : _a[path]) === null || _b === void 0 ? void 0 : _b.includes(method);
};
const authMiddleware = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    const jwtSecret = process.env.JWT_SECRET;
    const authHeaders = req.headers.authorization;
    if (authHeaders && authHeaders.startsWith("Bearer") && jwtSecret) {
        token = authHeaders.replace("Bearer ", "");
        jsonwebtoken_1.default.verify(token, jwtSecret, (err, decoded) => {
            if (err || (decoded && !isValidDecodedToken(decoded))) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            if (decoded && isValidDecodedToken(decoded)) {
                const role = decoded.user.role;
                req.user = decoded.user;
                const permission = getPermission(req, role);
                if (!permission) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }
                next();
            }
            else {
                res.status(401).json({ message: "Invalid token" });
                return;
            }
        });
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
}));
exports.authMiddleware = authMiddleware;
const isValidDecodedToken = (decoded) => {
    return (typeof decoded === "object" &&
        decoded !== null &&
        "user" in decoded &&
        typeof decoded.user === "object" &&
        decoded.user !== null &&
        "role" in decoded.user);
};
