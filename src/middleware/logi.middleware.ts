import { Request, Response, NextFunction } from "express";

/**
 * Middleware that logs a message and triggers an error with a status code.
 */
export function logMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(`🟢 ${req.method} request to ${req.originalUrl}`);
  next();
}
