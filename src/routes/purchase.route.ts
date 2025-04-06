import express from "express";
import stonePurchaseController from "../controllers/purchase/stonePurchase.cntroller";

const router = express.Router();

router.post("/stone", stonePurchaseController.purchaseStoneFromVendor);

export default router;
