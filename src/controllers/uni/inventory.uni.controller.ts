import UniApiService from "@src/services/uniApi/uni.api.service";
import { Request, Response } from "express";
import StoneUniLab from "../../models/stones/stoneUniLab.model";
import data from "../../data/response.json";

const fetchFullInventoryLab = async (req: Request, res: Response) => {
  try {
    console.log("🔄 Fetching full uni inventory lab...");
    const response = await UniApiService.post(
      "/home/inventory",
      { exclude_naturals: 1, exclude_lab_growns: 0 },
      {},
      true
    );

    if (!response || !Array.isArray(response)) {
      console.error("❌ Failed to fetch or invalid inventory data");
      return res.status(500).json({ error: "Invalid inventory data" });
    }

    // ✅ Insert API response directly into MongoDB
    await StoneUniLab.insertMany(response);
    console.log("✅ Inventory successfully inserted into MongoDB!");

    return res
      .status(200)
      .json({ message: "Inventory fetched and stored successfully" });
  } catch (error) {
    console.error("❌ Error fetching or storing full inventory (lab):", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// TODO: make it work as lab!
const fetchFullInventoryNatural = async (req: any, res: any) => {
  try {
    const response = await UniApiService.post(
      "/home/inventory",
      { exclude_naturals: 0, exclude_lab_growns: 1 },
      {},
      true
    );

    if (!response) {
      return res
        .status(500)
        .json({ error: "Failed to fetch full inventory (natural)" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error fetching full inventory (natural):", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const fetchInventoryUpdates = async (req: any, res: any) => {
  console.log("sagy1");

  try {
    const response = await UniApiService.post(
      "/home/inventory",
      {
        updates_since: "1741931421",
      },
      {},
      true
    );

    if (!response) {
      return res
        .status(500)
        .json({ error: "Failed to fetch inventory updates" });
    }

    return res.status(200).json(response);
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
  } catch (error) {
    console.error("Error importing JSON:", error);
  }
};

export default {
  fetchFullInventoryLab,
  fetchFullInventoryNatural,
  fetchInventoryUpdates,
  importStoneUniLabJSONToDB,
};
