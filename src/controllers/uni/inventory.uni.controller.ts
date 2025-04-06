import UniApiService from "@src/services/uniApi/uni.api.service";
import StoneUniLab from "../../models/stones/stoneUniLab.model";
import data from "../../data/responseFilteredLab.json";
import natural from "../../data/natural.json";
import StoneUniNatural from "@src/models/stones/stoneUniNatural.model";
import { parseInventoryUpdates } from "@src/utils/parsers/stones/uni/inventoryUpdate.uni.parser";
import { InventoryUpdateTypes } from "@src/types/inventoryUpdates.types";
import fs from "fs";
import path from "path";

const fetchFullInventoryLab = async (req: any, res: any) => {
  try {
    console.log("🔄 Step 1: Fetching full Uni lab-grown inventory...");

    const response: any[] | null = await UniApiService.post(
      "/home/inventory",
      { exclude_naturals: 1, exclude_lab_growns: 0 },
      {},
      { timeout: 900000, parseCsv: true }
    );

    if (!response || !Array.isArray(response) || response.length === 0) {
      console.error("❌ Step 2: Empty or invalid response from Uni.");
      return res
        .status(500)
        .json({ error: "Fetching Labgrown inventory from Uni failed" });
    }

    console.log(
      `✅ Step 2: Successfully fetched ${response.length} inventory items.`
    );

    console.log("🛠️ Step 3: Inserting inventory into MongoDB...");

    const responseDB = await StoneUniLab.insertMany(response);

    if (!responseDB || responseDB.length === 0) {
      console.error("❌ Step 4: MongoDB insert failed or returned no items.");
      return res
        .status(500)
        .json({ error: "Failed to insert inventory into DB" });
    }

    console.log(
      `✅ Step 5: Successfully inserted ${responseDB.length} items into MongoDB.`
    );

    console.log("✅ Inventory successfully inserted into MongoDB!");

    return res.status(200).json({
      message: "✅ Inventory fetched and stored successfully",
      insertedCount: responseDB.length,
    });
  } catch (error) {
    console.error("❌ Error fetching or storing full inventory (lab):", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// TODO: make it work as lab!
const fetchFullInventoryNatural = async (req: any, res: any) => {
  try {
    console.log("🔄 Step 1: Fetching full Uni natural inventory...");

    const response: any[] | null = await UniApiService.post(
      "/home/inventory",
      { exclude_naturals: 0, exclude_lab_growns: 1 },
      {},
      { timeout: 900000, parseCsv: true }
    );

    if (!response || !Array.isArray(response) || response.length === 0) {
      console.error("❌ Step 2: Empty or invalid response from Uni.");
      return res
        .status(500)
        .json({ error: "Fetching Natural inventory from Uni failed" });
    }

    console.log(
      `✅ Step 2: Successfully fetched ${response.length} inventory items.`
    );

    console.log("🛠️ Step 3: Inserting inventory into MongoDB...");

    const responseDB = await StoneUniNatural.insertMany(response);

    if (!responseDB || responseDB.length === 0) {
      console.error(
        "❌ Step 4: MongoDB insert to StoneUniNatural failed or returned no items."
      );
      return res
        .status(500)
        .json({ error: "Failed to insert inventory into StoneUniNatural DB" });
    }

    console.log(
      `✅ Step 5: Successfully inserted ${responseDB.length} items into MongoDB.`
    );

    console.log("✅ Inventory successfully inserted into MongoDB!");

    return res.status(200).json({
      message: "✅ Inventory fetched and stored successfully",
      insertedCount: responseDB.length,
    });
  } catch (error) {
    console.error("❌ Error fetching or storing full inventory (lab):", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const fetchInventoryUpdates = async (req: any, res: any) => {
  console.log("sagy1");
  const twoDaysAgoSeconds = Math.floor(Date.now() / 1000) - 2 * 24 * 60 * 60;
  console.log(twoDaysAgoSeconds);

  try {
    // const response = await UniApiService.post(
    //   "/home/inventory",
    //   {
    //     updates_since: twoDaysAgoSeconds,
    //   },
    //   {},
    //   { timeout: 900000, parseCsv: true }
    // );
    // console.log("sagy2", response);

    const mockResponse = [
      {
        stone_id: "003",
        lab: "GIA",
        active: "0",
        reserved: "0",
        reserved_till: "0",
        carat: "2.10",
        buy_price_per_carat: "1442.22",
        buy_price_total: "721.11",
        shape: "OV",
        color: "E",
        clarity: "VS1",
        cut: "",
        polish: "EX",
        symmetry: "VG",
        flu: "NON",
        length: "4.3500",
        width: "4.1300",
        height: "3.2000",
        ratio: "1.05",
        depth: "77.7%",
        table: "76%",
        origin: "",
        grading_url:
          "https://testgmapi.uni.diamonds/media/cert/7849419/10137247",
        video_url:
          "https://testgmapi.uni.diamonds/vision/detail.php?d=7849419&surl=https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10137247",
        sku_url:
          "https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10137247/still.jpg",
        sku_url_2: "",
        sku_url_3: "",
        country: "India",
        natural_diamond: "1",
        estimated_delivery: "5-7 days",
        updated_on: "1743397741",
      },
      // {
      //   stone_id: "01-07849421",
      //   lab: "GIA",
      //   active: "0",
      //   reserved: "0",
      //   reserved_till: "0",
      //   carat: "0.520",
      //   buy_price_per_carat: "1938.17",
      //   buy_price_total: "1007.85",
      //   shape: "EM",
      //   color: "D",
      //   clarity: "VVS1",
      //   cut: "",
      //   polish: "EX",
      //   symmetry: "EX",
      //   flu: "NON",
      //   length: "5.7900",
      //   width: "3.8600",
      //   height: "2.4500",
      //   ratio: "1.50",
      //   depth: "63.4%",
      //   table: "66%",
      //   origin: "",
      //   grading_url:
      //     "https://testgmapi.uni.diamonds/media/cert/7849421/10137249",
      //   video_url:
      //     "https://testgmapi.uni.diamonds/vision/detail.php?d=7849421&surl=https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10137249",
      //   sku_url:
      //     "https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10137249/default.jpg",
      //   sku_url_2:
      //     "https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10137249/still.jpg",
      //   sku_url_3: "",
      //   country: "India",
      //   natural_diamond: "1",
      //   estimated_delivery: "5-7 days",
      //   updated_on: "1743397741",
      // },
      // {
      //   stone_id: "LG01-3001565243",
      //   lab: "IGI",
      //   active: "0",
      //   reserved: "0",
      //   reserved_till: "0",
      //   carat: "1.000",
      //   buy_price_per_carat: "262.93",
      //   buy_price_total: "262.93",
      //   shape: "OV",
      //   color: "E",
      //   clarity: "VVS2",
      //   cut: "",
      //   polish: "EX",
      //   symmetry: "EX",
      //   flu: "NON",
      //   length: "8.0700",
      //   width: "5.6500",
      //   height: "3.5400",
      //   ratio: "1.43",
      //   depth: "62.7%",
      //   table: "59%",
      //   origin: "",
      //   grading_url: "",
      //   video_url:
      //     "https://testgmapi.uni.diamonds/vision/detail.php?d=3001565243&surl=https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10144874",
      //   sku_url:
      //     "https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10144874/default.jpg",
      //   sku_url_2:
      //     "https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10144874/still.jpg",
      //   sku_url_3: "",
      //   country: "",
      //   natural_diamond: "0",
      //   estimated_delivery: "",
      //   updated_on: "1743413857",
      // },
      // {
      //   stone_id: "LG01-3001565244",
      //   lab: "IGI",
      //   active: "0",
      //   reserved: "0",
      //   reserved_till: "0",
      //   carat: "0.970",
      //   buy_price_per_carat: "257.34",
      //   buy_price_total: "249.62",
      //   shape: "EM",
      //   color: "E",
      //   clarity: "VS1",
      //   cut: "",
      //   polish: "EX",
      //   symmetry: "VG",
      //   flu: "NON",
      //   length: "6.6000",
      //   width: "4.6500",
      //   height: "3.2200",
      //   ratio: "1.42",
      //   depth: "69.2%",
      //   table: "60%",
      //   origin: "",
      //   grading_url: "",
      //   video_url:
      //     "https://testgmapi.uni.diamonds/vision/detail.php?d=3001565244&surl=https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10144875",
      //   sku_url:
      //     "https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10144875/default.jpg",
      //   sku_url_2:
      //     "https://d305ukokfjetib.cloudfront.net/2024/4/20/grabber/imaged/10144875/still.jpg",
      //   sku_url_3: "",
      //   country: "",
      //   natural_diamond: "0",
      //   estimated_delivery: "",
      //   updated_on: "1743413857",
      // },
      // {
      //   stone_id: "LG01-3002089927",
      //   lab: "IGI",
      //   active: "0",
      //   reserved: "0",
      //   reserved_till: "0",
      //   carat: "0.580",
      //   buy_price_per_carat: "273.12",
      //   buy_price_total: "158.41",
      //   shape: "BR",
      //   color: "E",
      //   clarity: "VVS1",
      //   cut: "EX",
      //   polish: "EX",
      //   symmetry: "EX",
      //   flu: "NON",
      //   length: "0.0000",
      //   width: "0.0000",
      //   height: "0.0000",
      //   ratio: "0.00",
      //   depth: "61.5%",
      //   table: "57%",
      //   origin: "",
      //   grading_url: "",
      //   video_url: "",
      //   sku_url: "",
      //   sku_url_2: "",
      //   sku_url_3: "",
      //   country: "",
      //   natural_diamond: "0",
      //   estimated_delivery: "",
      //   updated_on: "1743485466",
      // },
      // {
      //   stone_id: "LG01-3002109167",
      //   lab: "IGI",
      //   active: "0",
      //   reserved: "0",
      //   reserved_till: "0",
      //   carat: "0.550",
      //   buy_price_per_carat: "279.71",
      //   buy_price_total: "153.84",
      //   shape: "BR",
      //   color: "E",
      //   clarity: "VVS1",
      //   cut: "EX",
      //   polish: "EX",
      //   symmetry: "EX",
      //   flu: "NON",
      //   length: "0.0000",
      //   width: "0.0000",
      //   height: "0.0000",
      //   ratio: "0.00",
      //   depth: "62.2%",
      //   table: "55%",
      //   origin: "",
      //   grading_url: "",
      //   video_url: "",
      //   sku_url: "",
      //   sku_url_2: "",
      //   sku_url_3: "",
      //   country: "",
      //   natural_diamond: "0",
      //   estimated_delivery: "",
      //   updated_on: "1743485466",
      // },
    ];

    const parsedInventoryUpdates = parseInventoryUpdates(mockResponse);

    // Run over all db entries and update them
    console.log("Updating mongo db items...");

    let successCount = 0;
    const failedUpdates: string[] = [];

    for (const inventoryUpdate of parsedInventoryUpdates) {
      const updatedStone = await StoneUniLab.updateOne(
        { stone_id: inventoryUpdate.stone_id },
        inventoryUpdate.data
      );

      console.log("sagy30", updatedStone);

      if (updatedStone.modifiedCount === 1) {
        successCount++;
      } else {
        failedUpdates.push(inventoryUpdate.stone_id);
      }
    }

    console.log(
      `✅ Successfully updated ${successCount}/${parsedInventoryUpdates.length} stones.`
    );
    if (failedUpdates.length > 0) {
      console.warn("❌ Failed to update the following stone_ids:");
      console.warn(failedUpdates);
    }

    console.log("Finished to update mongodb items!");
    // Send a response to the adminApp to update the shopify products,
    // the response should contain the parsed update ocbject.

    // if (!response) {
    //   return res
    //     .status(500)
    //     .json({ error: "Failed to fetch inventory updates" });
    // }

    // return res.status(200).json(response);
    return res.status(200).json(parsedInventoryUpdates);
  } catch (error) {
    console.error("❌ Error fetching inventory updates:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const importStoneUniLabJSONToDB = async () => {
  // get as body which file to import
  try {
    // Insert data into MongoDB
    await StoneUniLab.insertMany(data);
    console.log("JSON data imported successfully!");
    return true;
  } catch (error) {
    console.error("Error importing JSON:", error);
    return false;
  }
};

const importStoneUniNaturalJSONToDB = async () => {
  // get as body which file to import
  try {
    // Insert data into MongoDB
    await StoneUniNatural.insertMany(natural);
    console.log("JSON data imported successfully!");
    return true;
  } catch (error) {
    console.error("Error importing JSON:", error);
    return false;
  }
};

export default {
  fetchFullInventoryLab,
  fetchFullInventoryNatural,
  fetchInventoryUpdates,
  importStoneUniLabJSONToDB,
  importStoneUniNaturalJSONToDB,
};
