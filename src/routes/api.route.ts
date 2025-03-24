import express from "express";
import transactionRouter from "./transaction.route";
import uniRouter from "../routes/uni.route";
import stonesApiRouter from "../routes/stonesApi.route";
import settingsRouter from "../routes/settings.route";

const router = express.Router();

router.use("/transaction", transactionRouter);
router.use("/stonesApi", stonesApiRouter);
router.use("/settings", settingsRouter);

export default router;
