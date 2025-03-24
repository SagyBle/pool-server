import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface for SettingsMongodbToShopify document
 */
export interface ISettingsMongodbToShopify extends Document {
  name: string; // Name of the setting (for identification)
  description?: string; // Optional description of the filter
  freeText: string; // User-defined text
  mongoFilter: Record<string, any>; // JSON object for MongoDB query
  createdAt: Date; // Auto-generated timestamp
  updatedAt: Date; // Auto-updated timestamp
}

const SettingsMongodbToShopifySchema = new Schema<ISettingsMongodbToShopify>(
  {
    name: { type: String, required: true, unique: true }, // Unique identifier for settings
    description: { type: String, required: false }, // Optional description
    freeText: { type: String, required: true }, // Free text input
    mongoFilter: { type: Schema.Types.Mixed, required: true }, // Store filter as JSON object
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const SettingsMongodbToShopify = mongoose.model<ISettingsMongodbToShopify>(
  "SettingsMongodbToShopify",
  SettingsMongodbToShopifySchema
);

export default SettingsMongodbToShopify;
