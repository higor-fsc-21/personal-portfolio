import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 1. Environment setup
dotenv.config();
console.log(process.env);

// 2. Database setup
import connectDB from "./config/database";
connectDB();

// 3. Express app setup
const app = express();
const port = process.env.PORT || 3001;

// 4. Middleware setup
app.use(cors());
app.use(express.json());

// 5. Routes setup (after env is loaded)
import apiRoutes from "./routes/api";
app.use("/api", apiRoutes);

// 6. Basic routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Portfolio API" });
});

// 7. Server startup
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
