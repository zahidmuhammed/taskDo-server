"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const httpStatusCodes_1 = __importDefault(require("../constants/httpStatusCodes"));
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const errorStack = process.env.NODE_ENV === "production" ? null : err.stack;
    switch (statusCode) {
        case httpStatusCodes_1.default.BadRequest:
            res.json({
                title: "Bad request",
                message: err.message,
                stack: errorStack,
            });
            break;
        case httpStatusCodes_1.default.NotFound:
            res.json({
                title: "Not found",
                message: err.message,
                stack: errorStack,
            });
            break;
        case httpStatusCodes_1.default.Unauthorized:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stack: errorStack,
            });
            break;
        case httpStatusCodes_1.default.Forbidden:
            res.json({
                title: "Forbidden",
                message: err.message,
                stack: errorStack,
            });
            break;
        default:
            res.json({
                title: "Internal server error",
                message: err.message,
                stack: errorStack,
            });
    }
};
exports.errorHandler = errorHandler;
