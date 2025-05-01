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

const allowedOrigins = [
  "https://personal-portfolio-tk1m.vercel.app",
  "https://portfolio-bcnzrjci4-higors-projects-5bbdee39.vercel.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Origin not allowed:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "Accept",
    "X-Requested-With",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Enable CORS with options
app.use(cors(corsOptions));

// Handle OPTIONS preflight requests
app.options("*", cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// 5. Routes setup (after env is loaded)
import apiRoutes from "./routes/api";
app.use("/api", apiRoutes);

// 6. Basic routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Portfolio API" });
});

// Add a test endpoint for CORS
app.get("/cors-test", (req, res) => {
  res.json({
    message: "CORS is working",
    origin: req.headers.origin,
    allowedOrigins,
    headers: req.headers,
  });
});

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Allowed origins:", allowedOrigins);
});
