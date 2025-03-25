import express from "express";
import uniRouter from "../routes/uni.route";
import bbInventoryRouter from "./bbInventory.route";

const router = express.Router();
router.use("/uni", uniRouter);
router.use("/bbInventory", bbInventoryRouter);

export default router;
