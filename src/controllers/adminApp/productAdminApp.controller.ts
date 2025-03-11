// import AdminAppService from "../../services/api/adminApp.service";

import adminAppService from "@src/services/adminApp.service";

/**
 * Create a new product in Shopify
 * @param productData - Product details (shape, weight, color, etc.)
 */
const createShopifyProduct = async (productData: {
  shape: string;
  weight: string;
  color: string;
  cut: string;
  clarity: string;
  imageUrl: string;
  alt: string;
  price: string;
  media: { alt: string; mediaContentType: string; originalSource: string }[];
}) => {
  try {
    const response = await adminAppService.post("/productsadmin", productData);
    console.log("✅ Created Product Response:", response?.data);
    return response?.data;
  } catch (error) {
    console.error("❌ Error creating product:", error);
    throw new Error("Failed to create product.");
  }
};

export default {
  createShopifyProduct,
};
