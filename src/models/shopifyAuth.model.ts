import mongoose, { Schema, Document } from "mongoose";

// Define the interface for TypeScript
export interface IShopifyAuth extends Document {
  shop: string; // Shopify store domain
  access_token: string; // Shopify API access token
  scopes: string; // Granted API scopes
  created_at: Date; // Timestamp when stored
}

// Define the schema
const ShopifyAuthSchema = new Schema<IShopifyAuth>({
  shop: { type: String, required: true, unique: true }, // One token per store
  access_token: { type: String, required: true },
  scopes: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

// Create & export the model
export default mongoose.model<IShopifyAuth>("ShopifyAuth", ShopifyAuthSchema);
