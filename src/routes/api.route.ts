import express from "express";
import transactionRouter from "./transaction.route";
import uniRouter from "../routes/uni.route";
import stonesApiRouter from "../routes/stonesApi.route";

const router = express.Router();

router.use("/transaction", transactionRouter);
router.use("/stonesApi", stonesApiRouter);

export default router;
