import express, { Request, Response } from "express";
import { httpResponse } from "../lib/httpResponse";
import ITransaction from "../models/transaction.model";
import { logMiddleware } from "../middleware/logi.middleware";
import transactionModel from "../models/transaction.model";
import Transaction from "../models/transaction.model";
import { createTransactionController } from "@src/controllers/transaction.controller";
// import { validateRequestBody } from "../utils/requestValidator";

const router = express.Router();
router.post("/", logMiddleware, createTransactionController);

export default router;
