"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const errorHandler_1 = require("./middleware/errorHandler");
const authMiddleware_1 = require("./middleware/authMiddleware");
const AppConfig_1 = require("./config/AppConfig");
dotenv_1.default.config();
(0, dbConnection_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
app.use("/*", (0, cors_1.default)({
    origin: [
        "http://localhost:5001",
        "http://localhost:3000",
        "https://workflow-crework.vercel.app",
    ],
}));
app.get("/", (req, res) => {
    res.send(`Welcome to ${AppConfig_1.AppName} API - ${AppConfig_1.AppVersion}`);
});
app.get(AppConfig_1.basePath, (req, res) => {
    res.send(`Welcome to ${AppConfig_1.AppName} API - ${AppConfig_1.AppVersion}`);
});
app.use(express_1.default.json());
app.use(AppConfig_1.basePath, auth_1.default);
app.use(AppConfig_1.basePath, authMiddleware_1.authMiddleware, users_1.default);
app.use(AppConfig_1.basePath, authMiddleware_1.authMiddleware, tasks_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
