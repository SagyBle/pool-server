import UniApiService from "@src/services/uniApi/uni.api.service";
import { Request, Response } from "express";

const fetchFullInventoryLab = async (req: any, res: any) => {
  try {
    const response = await UniApiService.post("/home/fetch-full-inventory/lab");

    if (!response) {
      return res
        .status(500)
        .json({ error: "Failed to fetch full inventory (lab)" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error fetching full inventory (lab):", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const fetchFullInventoryNatural = async (req: any, res: any) => {
  try {
    const response = await UniApiService.post(
      "/home/fetch-full-inventory/natural"
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
  try {
    const response = await UniApiService.post("/home/fetch-inventory-updates");

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

export default {
  fetchFullInventoryLab,
  fetchFullInventoryNatural,
  fetchInventoryUpdates,
};
