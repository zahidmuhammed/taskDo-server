import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";

import auth from "./routes/auth";
import users from "./routes/users";
import tasks from "./routes/tasks";
import connectDB from "./config/dbConnection";
import { errorHandler } from "./middleware/errorHandler";
import { authMiddleware } from "./middleware/authMiddleware";
import { AppName, AppVersion, basePath } from "./config/AppConfig";

dotenv.config();
connectDB();

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.use(
    "/*",
    cors({
        origin: [
            "http://localhost:5001",
            "http://localhost:3000",
            "https://workflow-crework.vercel.app",
        ],
    })
);

app.get("/", (req: Request, res: Response) => {
    res.send(`Welcome to ${AppName} API - ${AppVersion}`);
});

app.get(basePath, (req: Request, res: Response) => {
    res.send(`Welcome to ${AppName} API - ${AppVersion}`);
});

app.use(express.json());

app.use(basePath, auth);
app.use(basePath, authMiddleware, users);
app.use(basePath, authMiddleware, tasks);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
