import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";
import apiRouter from "@src/routes/api.route";
import MongoDbService from "./services/mongoDB.service";
import authRouter from "./routes/auth.route";
import UniApiService from "./services/uniApi/uni.api.service";
import UniStoneParser from "./utils/parsers/uni/stone.uni.parser";
import productAdminAppController from "./controllers/adminApp/productAdminApp.controller";

async function start() {
  const app = express();
  app.use(bodyParser.json());
  dotenv.config({ path: "./.env" });

  app.get("/test", async (req, res) => {
    // get diamonds from api
    const r: any = await UniApiService.post(
      "bla bla bla",
      undefined,
      {},
      { parseCsv: true }
    );
    const stoneExample = r[0];
    console.log("sagy22", r[0]);

    // parse them
    const parsedDiamond = UniStoneParser.parse([stoneExample]);
    console.log("✅sagy3 Parsed Diamond:", parsedDiamond);
    const [productData] = parsedDiamond;

    const re = await productAdminAppController.createShopifyProduct(
      productData
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
