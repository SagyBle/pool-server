import mongoose from "mongoose";

const StoneUniNaturalSchema = new mongoose.Schema(
  {
    stone_id: { type: String, required: true, unique: true },
    lab: { type: String, required: true },

    active: { type: Boolean, required: true },
    reserved: { type: Boolean, required: true },
    reserved_till: { type: Number, required: true },

    carat: { type: Number, required: true },
    buy_price_per_carat: { type: Number, required: true },
    buy_price_total: { type: Number, required: true },

    shape: { type: String, required: true },
    color: { type: String, required: true },
    clarity: { type: String, required: true },
    cut: { type: String, default: "" },
    polish: { type: String, default: "" },
    symmetry: { type: String, default: "" },
    flu: { type: String, default: "" },

    length: { type: Number, default: null },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    ratio: { type: Number, default: null },

    depth: { type: String, default: "" },
    table: { type: String, default: "" },
    origin: { type: String, default: "" },

    grading_url: { type: String, default: "" },
    video_url: { type: String, default: "" },
    sku_url: { type: String, default: "" },
    sku_url_2: { type: String, default: "" },
    sku_url_3: { type: String, default: "" },

    country: { type: String, default: "" },
    natural_diamond: { type: Boolean, required: true },
    estimated_delivery: { type: String, default: "" },
    updated_on: { type: Number, required: true },
    isShopifyProduct: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const StoneUniNatural = mongoose.model(
  "StoneUniNatural",
  StoneUniNaturalSchema
);
export default StoneUniNatural;
