import inventoryUniController from "@src/controllers/uni/inventory.uni.controller";

export async function syncUpdatesUniJob(): Promise<void> {
  console.log("syncUpdatesUniJob started...");

  try {
    // 1. Fetch updates as csv from Uni API
    // 2. Parse the csv, and convert it to uniStones workable object
    // //   a. parse to json
    const updates = [
      {
        stone_id: "01-06434003",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "1.800",
        buy_price_per_carat: "17212.5",
        buy_price_total: "30982.50",
        shape: "BR",
        color: "D",
        clarity: "IF",
        cut: "EX",
        polish: "EX",
        symmetry: "EX",
        flu: "NON",
        length: "7.6700",
        width: "7.7400",
        height: "4.8400",
        ratio: "0.99",
        depth: "62.9%",
        table: "57%",
        origin: "NA",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/6434003/7455408",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=6434003&surl=https://d305ukokfjetib.cloudfront.net/2023/8/17/grabber/imaged/7455408",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2023/8/17/grabber/imaged/7455408/still.jpg",
        sku_url_2: "",
        sku_url_3: "",
        country: "India",
        natural_diamond: "1",
        estimated_delivery: "5-7 days",
        updated_on: "1742796328",
      },
    ];

    updates.forEach(async (update) => {
      if (update.active === "0") {
        // a. deacticate stone in db: mongodbservice.deactivateStone(update.stone_id)
        // b. deacticate stone in shopify: shopifyService.turnQuantityToZero(update.stone_id)
      }
    });
    // 3. Run over each stone at: uniStones
    // // a. Get the mutual DBstone from the db, and compare it to the uniStone.
    // // b. Understand which update has been occured: details, availabilty...
    // // c. Create a updateObject
    // // d. Update the DBstone with the new data.
    // // e. Run over the shopify products and update them as well, according to the updateObjects.

    console.log("syncUpdatesUni", "✅ Successfully completed");
  } catch (error) {
    console.error("❌ Job syncUpdatesUni failed:", error);
  } finally {
    console.log("syncUpdatesUniJob finished...");
  }
}
