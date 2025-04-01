import SettingsMongodbToShopify from "@src/models/apiSettings/settingsMongoDbToshopify.model";
import MongoDbService from "@src/services/mongoDB.service";
import { Router } from "express";

const router = Router();

router.post("/stone", (req, res) => {
  console.log("got deactivation stone request");

  const { stone_id, buyer_details, is_already_sold, deactivation_reason } =
    req.body;

  res.send(
    `Got deactivation stone: ${stone_id}, from the reason: ${deactivation_reason}`
  );
});

export default router;
