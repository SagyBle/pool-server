import express from "express";
import AvailabilityUniController from "@src/controllers/uni/availability.uni.controller";
import TradeUniController from "@src/controllers/uni/trade.uni.controller";
import InventoryUniController from "@src/controllers/uni/inventory.uni.controller";
import MongoDbService from "@src/services/mongoDB.service";
import StoneUniLab from "@src/models/stones/stoneUniLab.model";
import Transaction from "@src/models/transaction.model";
import UniStoneParser from "@src/utils/parsers/stones/uni/stone.uni.parser";
import { FiltersUniStoneParser } from "@src/utils/parsers/stones/uni/filters.stones.uni.parser";

const router = express.Router();

router.post("/test", async (req, res) => {
  console.log("📝 sagy135", "Received Filters:", req.body);

  // TODO: Create a parser that will parse the filters like uni wants them in the mongodb
  const { filters } = req.body;
  const parsedUniFilters = FiltersUniStoneParser.parse(filters);
  console.log("sagy100", { parsedUniFilters });

  try {
    console.log("sagy100", { parsedUniFilters });

    const response = await MongoDbService.getByBody(
      StoneUniLab,
      parsedUniFilters,
      5
    );

    console.log("sagy101", response);

    if (!response || !Array.isArray(response)) {
      throw new Error("❌ Fetch Stones Failed");
    }

    const parsedStones = UniStoneParser.parse(response);
    console.log("sagy103", { parsedStones });

    res.status(200).json({ uniStones: parsedStones });
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
router.put(
  "/fetch-inventory-updates",
  InventoryUniController.fetchInventoryUpdates
);

export default router;
