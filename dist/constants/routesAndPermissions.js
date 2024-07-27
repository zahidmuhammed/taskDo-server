"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesAndPermissions = void 0;
exports.RoutesAndPermissions = {
    admin: {
        login: ["post"],
        signup: ["post"],
        users: ["get", "post", "patch", "delete"],
        tasks: ["get", "post", "patch", "delete"],
    },
    user: {
        login: ["post"],
        signup: ["post"],
        users: [],
        tasks: ["get", "post", "patch", "delete"],
    },
};
