import mongoose from "mongoose";

const StoneUniLabSchema = new mongoose.Schema(
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
    color: { type: String, default: "" }, // TODO: notice what happens here
    clarity: { type: String, default: "" },
    cut: { type: String, default: "" }, // Empty string in your JSON
    polish: { type: String, default: "" },
    symmetry: { type: String, default: "" },
    flu: { type: String, default: "" },
    length: { type: Number, default: "" },
    width: { type: Number, default: "" },
    height: { type: Number, default: "" },
    ratio: { type: Number, default: "" },
    depth: { type: String, default: "" },
    table: { type: String, default: "" },
    origin: { type: String, default: "" }, // Empty string in your JSON
    grading_url: { type: String, default: "" },
    video_url: { type: String, default: "" },
    sku_url: { type: String, default: "" },
    sku_url_2: { type: String, default: "" },
    sku_url_3: { type: String, default: "" }, // Some entries have an empty string
    country: { type: String, default: "" },
    natural_diamond: { type: Boolean, required: true },
    estimated_delivery: { type: String, default: "" },
    updated_on: { type: Number, required: true },
    isShopifyProduct: { type: Boolean, required: true, default: false },
    purchased: { type: Object, default: {} },
  },
  { timestamps: true }
);

const StoneUniLab = mongoose.model<any>("StoneUniLab", StoneUniLabSchema);
export default StoneUniLab;
