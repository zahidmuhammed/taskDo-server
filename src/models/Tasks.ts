import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
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
    },
    { timestamps: true }
);

const Tasks = model("Tasks", TaskSchema);
export default Tasks;
