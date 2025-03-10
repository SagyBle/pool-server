import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const MONGODB_URL = process.env.MONGODB_URL as string;

  mongoose
    .connect(MONGODB_URL, {})
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("MongoDB connection error:", err));
};
