import express from "express";
import bbInventoryController from "../controllers/bbInventory/inventory.bbInventory.controller";

const router = express.Router();

router.post("/test", async (req, res) => {
  console.log("received request");

  const { body } = req;
  console.log("sagy13", body);
  res.send("ok");
});

router.post("/createStone", bbInventoryController.createStone);

export default router;
