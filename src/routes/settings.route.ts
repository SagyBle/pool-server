import SettingsMongodbToShopify from "@src/models/apiSettings/settingsMongoDbToshopify.model";
import MongoDbService from "@src/services/mongoDB.service";
import { Router } from "express";

const router = Router();

router.get("/mongodb-to-shopify/:settingId", (req, res) => {
  const settingId = req.params.settingId;
  // Fetch the specific setting logic here
  console.log("ererer");

  res.send(`Setting with ID: ${settingId}`);
});

router.get("/mongodb-to-shopify", async (req, res) => {
  // Fetch all settings logic here
  const response = await MongoDbService.getAll(SettingsMongodbToShopify);
  res.send(response);
});

router.post("/mongodb-to-shopify", async (req, res) => {
  // Handle update settings logic herec
  const data = req.body;
  if (!data) {
    res.status(400).send("Data is required");
  }
  const response = await MongoDbService.create(
    SettingsMongodbToShopify,
    req.body
  );
  res.send(response);
});

router.put("/mongodb-to-shopify", async (req, res) => {
  const body = req.body;
  if (!body || !body.settingId || !body.data) {
    res.status(400).send("settingId and data are required");
  }
  const response = await MongoDbService.updateById(
    SettingsMongodbToShopify,
    body.settingId,
    body.data
  );
  res.send(response);
});

router.delete("/mongodb-to-shopify/:settingId", async (req, res) => {
  const settingId = req.params.settingId;
  if (!settingId) {
    res.status(400).send("settingId is required");
  }
  const response = await MongoDbService.deleteById(
    SettingsMongodbToShopify,
    settingId
  );
  res.send(response);
});

export default router;
