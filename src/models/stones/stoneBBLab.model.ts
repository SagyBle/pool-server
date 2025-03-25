import mongoose from "mongoose";

const StoneBBLabSchema = new mongoose.Schema(
  {
    stone_id: { type: String, required: true, unique: true },
    shape: { type: String, required: true },
    weight: { type: Number, required: true }, // assuming "ct"
    color: { type: String, required: true },
    cut: { type: String, default: "" }, // can be empty
    clarity: { type: String, required: true },
    lab: { type: String, required: true },
    cost: { type: Number, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number }, // optional
    imageUrl: { type: String, required: true },
    stoneType: { type: String, required: true }, // "Lab Grown" or "Natural"
    purchasedDate: { type: String, required: true }, // keep string or convert to Date if needed
    isShopifyProduct: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const StoneBBLab = mongoose.model("StoneBBLab", StoneBBLabSchema);
export default StoneBBLab;
