import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthController {
  login = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const correctPassword = process.env.ADMIN_PASSWORD || "admin123";

      // For development, allow "admin" as a password
      if (password === correctPassword || password === "admin") {
        const token = jwt.sign(
          { role: "admin" },
          process.env.JWT_SECRET || "fallback-secret",
          { expiresIn: "24h" }
        );

        return res.json({
          success: true,
          token,
          message: "Authentication successful",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authentication failed",
        error,
      });
    }
  };
}

export default new AuthController();
