import express from "express";
import bbInventoryController from "../controllers/bbInventory/inventory.bbInventory.controller";

const router = express.Router();

router.post("/bla", async (req, res) => {
  console.log("received request");

  const { body } = req;
  console.log("sagy13", body);
  res.json({ ok: "ok" });
});

router.post("/getFilteredStones", bbInventoryController.getFilteredStones);

// CRUD bb inventory
router.post("/createStone", bbInventoryController.createStone);
router.get("/getStones", bbInventoryController.getStones);
router.get("/getStone/:stoneId", bbInventoryController.getStone);
router.put("/updateStone", bbInventoryController.updateStone);
router.delete("/deleteStone", bbInventoryController.deleteStone);

export default router;
