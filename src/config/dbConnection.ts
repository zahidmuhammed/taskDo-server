import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGODB_CONNECT) {
        throw new Error("MONGODB_CONNECT is not defined");
    }
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CONNECT);
        console.log(
            `Database connected: ${connect.connection.host}, ${connect.connection.db.namespace}`
        );
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

export default connectDB;
