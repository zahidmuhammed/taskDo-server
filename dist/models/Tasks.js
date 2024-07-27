"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User ID is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    status: {
        type: String,
        enum: ["todo", "in_progress", "review", "completed"],
        default: "todo",
    },
    priority: {
        type: String,
        enum: ["low", "medium", "urgent"],
    },
    deadline: {
        type: Date,
    },
    description: {
        type: String,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    is_favorite: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Tasks = (0, mongoose_1.model)("Tasks", TaskSchema);
exports.default = Tasks;
