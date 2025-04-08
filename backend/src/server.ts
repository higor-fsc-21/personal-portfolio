import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Portfolio API" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
