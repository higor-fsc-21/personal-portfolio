import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";

// 1. Environment setup
dotenv.config();

// 2. Database setup
import connectDB from "./config/database";
connectDB();

// 3. Express app setup
const app = express();

// 4. Middleware setup
// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Origin:", req.headers.origin);
  console.log("Headers:", req.headers);
  next();
});

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
};

// Handle preflight requests
// app.options("*", cors(corsOptions));

// app.use(cors());
app.use(express.json());

// 5. Routes setup (after env is loaded)
import apiRoutes from "./routes/api";
app.use("/api", apiRoutes);

// 6. Basic routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Portfolio API - v2" });
});

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
