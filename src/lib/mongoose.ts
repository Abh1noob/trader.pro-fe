import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(uri, { dbName: "search" });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error(
      `Failed to connect to MongoDB: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
