import dotenv from "dotenv";
import ApiService from "./api/api.service";

class AdminAppService extends ApiService {
  constructor() {
    dotenv.config();

    super(process.env.ADMIN_APP_BASE_URL || "", {
      "X-Shopify-Access-Token": process.env.ADMIN_APP_ACCESS_TOKEN || "",
      "X-Shopify-Shop-Domain": process.env.SHOP_DOMAIN || "",
    });
  }

  /**
   * Fetch shop details from Shopify Admin API
   */
  public async getShopDetails() {
    return this.get("/shop.json");
  }
}

export default new AdminAppService();
