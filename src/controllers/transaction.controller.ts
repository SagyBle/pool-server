import { Request, Response, NextFunction } from "express";
import { httpResponse } from "../lib/httpResponse";
import Transaction from "../models/transaction.model";

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

    // // Create a new transaction
    // const transaction = new Transaction({
    //   description,
    // });
    // await transaction.save();
    const transaction = await Transaction.create({ description: "!23" });

    httpResponse(res, 201, "Transaction created successfully", { transaction });
  } catch (error) {
    console.error("❌ Error in createTransactionController:", error);
    next(error); // Pass error to global error handler
  }
};
