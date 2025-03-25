import express from "express";
import uniRouter from "../routes/uni.route";
import bbInventory from "./bbInventory.route";

const router = express.Router();
router.use("/uni", uniRouter);
router.use("/bbInventory", bbInventory);

export default router;
