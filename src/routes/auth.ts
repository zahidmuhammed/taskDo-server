import express from "express";
import { signup, login } from "../controllers/authController";

const auth = express.Router();

auth.post("/login", login);
auth.post("/signup", signup);

export default auth;
