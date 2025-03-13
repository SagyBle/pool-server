import express from "express";
import uniRouter from "../routes/uni.route";

const router = express.Router();
router.use("/uni", uniRouter);

export default router;
