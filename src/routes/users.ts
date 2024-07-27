import express from "express";

import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/usersController";

const users = express.Router();
const routeName = "users";

// TODO : add auth middleware to protect routes only for admin
users.get(`/${routeName}`, getUsers);
users.get(`/${routeName}/:id`, getUserById);
users.patch(`/${routeName}/:id`, updateUser);
users.delete(`/${routeName}/:id`, deleteUser);

export default users;
