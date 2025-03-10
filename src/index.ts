import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./lib/dbConnection";
import transactionRouter from "./routes/transaction.route";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";
import apiRouter from "@src/routes/api.route";
import cron from "node-cron";

async function start() {
  dotenv.config({
    path: "./.env",
  });

  const app = express();
  app.use(bodyParser.json());

  app.get("/test", (req, res) => {
    res.send("🟢 Server Is Working 🟢");
  });

  app.use("/api", apiRouter);
  app.use(errorHandler);

  const SERVER_PORT = process.env.SERVER_PORT || 3001;

  await connectToDatabase();
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}...`);
  });

  // cron.schedule("*/5 * * * * *", () => {
  //   console.log("Hello, World!");
  // });
}

start();
