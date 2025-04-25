import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

// 1. Environment setup
dotenv.config();

// 2. Database setup
import connectDB from "./config/database";
connectDB();

// 3. Express app setup
const app = express();

// 4. Middleware setup
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
};
app.use(cors(corsOptions));
app.use(express.json());

// 5. Routes setup (after env is loaded)
import apiRoutes from "./routes/api";
app.use("/api", apiRoutes);

// 6. Basic routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Portfolio API (Lambda)" });
});

// 7. Export the handler for Lambda instead of listening
export const handler = serverless(app);
