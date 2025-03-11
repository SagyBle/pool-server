import { Request, Response } from "express";
import dotenv from "dotenv";
import generalApiService from "../services/api/generalApi.service";
import shopifyAuthHandler from "../handlers/shopifyAuth.handler";

dotenv.config();

const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.SHOPIFY_REDIRECT_URI || "https://your-app.com/auth/callback"; // Update with your app's URL
const SCOPES = "read_products,write_orders,write_inventory,read_inventory"; // Customize your scopes

// 🔹 Step 1: Redirect User to Shopify OAuth Page
export const redirectToShopifyAuth = async (req: any, res: any) => {
  const shop = req.query.shop as string; // Get shop from request query

  if (!shop) return res.status(400).json({ error: "Missing shop parameter" });

  const nonce = "random_nonce_sagy"; // Generate a secure random nonce

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&state=${nonce}`;

  res.redirect(authUrl);
};

// 🔹 Step 2: Handle Shopify OAuth Callback
export const handleShopifyAuthCallback = async (req: any, res: any) => {
  const { shop, code } = req.query;

  if (!shop || !code) {
    return res.status(400).json({ error: "Missing shop or code parameter" });
  }

  if (!CLIENT_SECRET || !CLIENT_ID) {
    return res
      .status(500)
      .json({ error: "Missing CLIENT_SECRET or CLIENT_ID in .env" });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await generalApiService.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      },
      { "Content-Type": "application/json" }
    );

    console.log(`✅ Access Token Response:`, tokenResponse?.data);

    if (tokenResponse?.data) {
      // Save the access token securely
      shopifyAuthHandler.saveShopifyAuth(
        shop as string,
        tokenResponse.data.access_token,
        ""
      );
    }

    return res.json({
      success: true,
      message: "Access token received successfully",
      accessToken: tokenResponse?.data.access_token,
    });
  } catch (error: any) {
    console.error(
      "❌ Error exchanging token:",
      error.response?.data || error.message || error
    );
    return res.status(500).json({
      error: "Failed to exchange authorization code for access token",
    });
  }
};
