import { Request, Response, NextFunction } from "express";
import httpStatusCodes from "../constants/httpStatusCodes";

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode || 500;
    const errorStack = process.env.NODE_ENV === "production" ? null : err.stack;

    switch (statusCode) {
        case httpStatusCodes.BadRequest:
            res.json({
                title: "Bad request",
                message: err.message,
                stack: errorStack,
            });
            break;

        case httpStatusCodes.NotFound:
            res.json({
                title: "Not found",
                message: err.message,
                stack: errorStack,
            });
            break;

        case httpStatusCodes.Unauthorized:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stack: errorStack,
            });
            break;

        case httpStatusCodes.Forbidden:
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

export { errorHandler };
