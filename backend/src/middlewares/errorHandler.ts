import { Request, Response, NextFunction } from "express";

// Global error handler middleware
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log the error to CloudWatch (console.error)
  console.error("[Error]", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  // Set status code (default to 500)
  const status = err.statusCode || 500;
  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      status,
      // Only show stack in non-production
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    },
  });
}
