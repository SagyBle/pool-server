import express from "express";
import transactionRouter from "./transaction.route";
import uniRouter from "../routes/uni.route";
import stonesApiRouter from "../routes/stonesApi.route";
import settingsRouter from "../routes/settings.route";
import deactivationRouter from "../routes/deactivation.route";

const router = express.Router();

router.use("/transaction", transactionRouter);
router.use("/stonesApi", stonesApiRouter);
router.use("/settings", settingsRouter);
router.use("/deactivation", deactivationRouter);

export default router;
