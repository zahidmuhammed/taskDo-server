"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const users = express_1.default.Router();
const routeName = "users";
// TODO : add auth middleware to protect routes only for admin
users.get(`/${routeName}`, usersController_1.getUsers);
users.get(`/${routeName}/:id`, usersController_1.getUserById);
users.patch(`/${routeName}/:id`, usersController_1.updateUser);
users.delete(`/${routeName}/:id`, usersController_1.deleteUser);
exports.default = users;
