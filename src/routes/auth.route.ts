import {
  handleShopifyAuthCallback,
  redirectToShopifyAuth,
} from "@src/controllers/auth.controller";
import express from "express";

const authRouter = express.Router();

authRouter.get("/", redirectToShopifyAuth); // Shopify OAuth start
authRouter.get("/callback", handleShopifyAuthCallback); // OAuth Callback

export default authRouter;
