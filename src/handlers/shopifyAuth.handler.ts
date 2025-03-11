import ShopifyAuth, { IShopifyAuth } from "@src/models/shopifyAuth.model";

/**
 * Save or update a Shopify access token in the database.
 * @param {string} shop - Shopify store domain.
 * @param {string} accessToken - Access token received from Shopify.
 * @param {string} scopes - The granted API scopes.
 * @returns {Promise<IShopifyAuth>} - The saved or updated token entry.
 */
export const saveShopifyAuth = async (
  shop: string,
  accessToken: string,
  scopes: string
): Promise<IShopifyAuth> => {
  return await ShopifyAuth.findOneAndUpdate(
    { shop }, // Find the store entry
    { access_token: accessToken, scopes, created_at: new Date() }, // Update values
    { upsert: true, new: true } // Create if it doesn't exist
  );
};

/**
 * Retrieve a Shopify access token from the database.
 * @param {string} shop - Shopify store domain.
 * @returns {Promise<string | null>} - The stored access token or null if not found.
 */
export const getShopifyAccessToken = async (
  shop: string
): Promise<string | null> => {
  const shopData = await ShopifyAuth.findOne({ shop });
  return shopData?.access_token || null;
};

/**
 * Delete a Shopify store's access token (e.g., when a store uninstalls the app).
 * @param {string} shop - Shopify store domain.
 * @returns {Promise<boolean>} - True if deleted, false if not found.
 */
export const deleteShopifyAuth = async (shop: string): Promise<boolean> => {
  const result = await ShopifyAuth.deleteOne({ shop });
  return result.deletedCount > 0;
};

export default {
  saveShopifyAuth,
  getShopifyAccessToken,
  deleteShopifyAuth,
};
