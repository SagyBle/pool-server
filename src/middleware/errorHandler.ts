import { Request, Response, NextFunction } from "express";
import { httpResponse } from "../lib/httpResponse";

/**
 * Global error handling middleware.
 * Ensures all errors are properly handled and prevent the server from crashing.
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("❌ Error:", err.message);
  httpResponse(res, 500, err.message || "Internal Server Error", {
    error: err,
  });
}
