import express from "express";
import AvailabilityUniController from "@src/controllers/uni/availability.uni.controller";
import TradeUniController from "@src/controllers/uni/trade.uni.controller";
import InventoryUniController from "@src/controllers/uni/inventory.uni.controller";
import MongoDbService from "@src/services/mongoDB.service";
import StoneUniLab from "@src/models/stones/stoneUniLab.model";
import Transaction from "@src/models/transaction.model";
import UniStoneParser from "@src/utils/parsers/uni/stone.uni.parser";

const router = express.Router();

router.post("/test", async (req, res) => {
  console.log("📝 Received Filters:", req.body);

  // TODO: parse filters!!!
  const { color, shape, carat } = req.body;

  // ✅ Convert carat to range (if provided)
  let caratFilter = {};
  if (carat) {
    const caratValue = Number(carat);
    if (!isNaN(caratValue) && caratValue > 0) {
      caratFilter = { carat: { $gte: caratValue - 0.1, $lte: caratValue } };
    }
  }

  const filters = { color, shape, ...caratFilter };

  try {
    const response = await MongoDbService.getByBody(StoneUniLab, filters, 5);

    if (!response || !Array.isArray(response)) {
      throw new Error("❌ Fetch Stones Failed");
    }

    const parsedStones = UniStoneParser.parse(response);
    console.log("sagy103", { parsedStones });

    res.status(200).json(parsedStones);
  } catch (error) {
    console.error("❌ Error fetching stones:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
