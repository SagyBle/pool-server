import express from "express";
import AvailabilityUniController from "@src/controllers/uni/availability.uni.controller";
import TradeUniController from "@src/controllers/uni/trade.uni.controller";
import InventoryUniController from "@src/controllers/uni/inventory.uni.controller";

const router = express.Router();

// Trading Operations Routes
router.post(
  "/check-stones-availability",
  AvailabilityUniController.checkStonesAvailability
);
router.post("/hold-stones", TradeUniController.holdStones);
router.post("/release-stones", TradeUniController.releaseStones);
router.post("/buy-stones", TradeUniController.buyStones);
router.post("/get-stones", TradeUniController.getStones);

// DB Maintenance Routes
router.post(
  "/fetch-full-inventory/lab",
  InventoryUniController.fetchFullInventoryLab
);
router.post(
  "/fetch-full-inventory/natural",
  InventoryUniController.fetchFullInventoryNatural
);
router.post(
  "/fetch-inventory-updates",
  InventoryUniController.fetchInventoryUpdates
);

export default router;
