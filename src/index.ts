import express from "express";
import dotenv from "dotenv";
import { connectToDatabase, db } from "./lib/dbConnection";
import transactionRouter from "./routes/transaction.route";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";

async function start() {
  dotenv.config({
    path: "./.env",
  });

  const app = express();

  app.use(bodyParser.json());

  await connectToDatabase();

  app.get("/", (req, res) => {
    res.send("Hello world!");
  });

  // app.post("/transction", (req, res) => {
  //   res.send("Hello world!");
  // });

  app.use("/transaction", transactionRouter);

  app.use(errorHandler);

  const SERVER_PORT = process.env.SERVER_PORT || 3001;

  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}...`);
  });
}

start();
