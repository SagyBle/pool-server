import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";
import apiRouter from "@src/routes/api.route";
import MongoDbService from "./services/mongoDB.service";
import authRouter from "./routes/auth.route";
import UniStoneParser from "./utils/parsers/stones/uni/stone.uni.parser";
import productAdminAppController from "./controllers/adminApp/productAdminApp.controller";
import StoneUniLab from "./models/stones/stoneUniLab.model";
import cors from "cors";

async function start() {
  const app = express();

  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(bodyParser.json());
  dotenv.config({ path: "./.env" });

  app.get("/test", async (req, res) => {
    // get diamonds from api

    // parse them
    // const parsedDiamond = UniStoneParser.parse([stoneExample]);

    const stone = await StoneUniLab.findById("67d69bef1b006034c08b88f1");
    console.log("sagy10", { stone });
    const [parsedStone] = UniStoneParser.parse(stone);
    console.log("sagy11", { parsedStone });

    const re = await productAdminAppController.createShopifyProduct(
      parsedStone
    );

    console.log("sagy123 re", re);

    // create product in the shopify product
    // create a db entry?
    res.send("🟢 Server Is Working 🟢");
  });

  app.use("/api", apiRouter);
  app.use("/auth", authRouter);

  app.use(errorHandler);

  const SERVER_PORT = process.env.SERVER_PORT || 3001;
  const MONGODB_URL = process.env.MONGODB_URL;

  await MongoDbService.connect(MONGODB_URL as string);
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}...`);
  });

  // cron.schedule("*/5 * * * * *", () => {
  //   console.log("Hello, World!");
  // });
}

start();
