import express from "express";
import transactionRouter from "./transaction.route";

const router = express.Router();

router.use("/transaction", transactionRouter);

export default router;
