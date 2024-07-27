import { Request } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { RoutesAndPermissions } from "../constants/routesAndPermissions";

type Role = "admin" | "user";

const getPermission = (req: Request, role: Role) => {
    const path = req.originalUrl.split(
        "/"
    )[2] as keyof (typeof RoutesAndPermissions)[Role];
    const method = req.method.toLowerCase();
    return RoutesAndPermissions[role]?.[path]?.includes(method as never);
};

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    const jwtSecret = process.env.JWT_SECRET;
    const authHeaders = req.headers.authorization;

    if (authHeaders && authHeaders.startsWith("Bearer") && jwtSecret) {
        token = authHeaders.replace("Bearer ", "");

        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err || (decoded && !isValidDecodedToken(decoded))) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            if (decoded && isValidDecodedToken(decoded)) {
                const role = decoded.user.role;
                (req as any).user = decoded.user;

                const permission = getPermission(req, role as Role);

                if (!permission) {
                    res.status(401).json({ message: "Unauthorized" });
                    return;
                }

                next();
            } else {
                res.status(401).json({ message: "Invalid token" });
                return;
            }
        });
    } else {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
});

const isValidDecodedToken = (
    decoded: string | jwt.JwtPayload
): decoded is jwt.JwtPayload & { user: { role: string } } => {
    return (
        typeof decoded === "object" &&
        decoded !== null &&
        "user" in decoded &&
        typeof decoded.user === "object" &&
        decoded.user !== null &&
        "role" in decoded.user
    );
};

export { authMiddleware };
