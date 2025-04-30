import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";
import { errorHandler } from "./middlewares/errorHandler";

// 1. Environment setup
dotenv.config();

// 2. Database setup
import connectDB from "./config/database";
connectDB();

// 3. Express app setup
const app = express();

// 4. Middleware setup
const allowedOrigins = [process.env.CORS_ORIGIN].filter(Boolean);

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Origin:", req.headers.origin);
  console.log("Headers:", req.headers);
  next();
});

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked origin:", origin);
      console.log("Allowed origins:", allowedOrigins);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
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

// Add an endpoint to check CORS configuration
app.get("/cors-test", (req, res) => {
  res.json({
    message: "CORS is working",
    origin: req.headers.origin,
    allowedOrigins,
  });
});

app.use(errorHandler);

// 7. Export the handler for Lambda instead of listening
export const handler = serverless(app);
