import { Request, Response, NextFunction } from "express";
import { httpResponse } from "../lib/httpResponse";
import Transaction from "../models/transaction.model";
import MongoDbService from "@src/services/mongoDB.service";

/**
 * Controller for creating a new transaction.
 */
export const createTransactionController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { description } = req.body;

    // Validate request body
    if (!description) {
      httpResponse(res, 400, "Missing required fields");
      return;
    }

    const transaction = await MongoDbService.create(Transaction, {
      description: "123",
    });

    httpResponse(res, 201, "Transaction created successfully", { transaction });
  } catch (error) {
    console.error("❌ Error in createTransactionController:", error);
    next(error); // Pass error to global error handler
  }
};
