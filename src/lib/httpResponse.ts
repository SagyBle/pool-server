import { Response } from "express";

export const httpResponse = (
  res: Response,
  status: number,
  message?: string,
  data?: any
): Response => {
  return res.status(status).json({
    message,
    data,
  });
};
