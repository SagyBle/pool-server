import { Request, Response } from "express";
import StoneBBLab from "../../models/stones/stoneBBLab.model";
import StoneBBNatural from "@src/models/stones/stoneBBNatural.model";
import MongoDbService from "@src/services/mongoDB.service";

// Create
const createStone = async (req: any, res: any) => {
  try {
    const body = req.body;
    let stone;

    if (body.stoneType === "Lab Grown") {
      stone = await MongoDbService.create(StoneBBLab, body);
    } else if (body.stoneType === "Natural") {
      stone = await MongoDbService.create(StoneBBNatural, body);
    } else {
      return res.status(400).json({ message: "Invalid stone type" });
    }

    if (!stone) {
      return res.status(500).json({ message: "Failed to create stone" });
    }

    return res
      .status(201)
      .json({ message: "Stone created successfully", stone });
  } catch (error: any) {
    console.error("❌ Failed to create stone:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

// Read
const getStones = async (req: any, res: any) => {
  try {
    const { stoneType } = req.query;

    let stones;
    if (stoneType === "Lab Grown") {
      stones = await MongoDbService.getAll(StoneBBLab);
    } else if (stoneType === "Natural") {
      stones = await MongoDbService.getAll(StoneBBNatural);
    } else {
      return res
        .status(400)
        .json({ message: "Missing or invalid stoneType query param" });
    }

    return res.status(200).json({ stones });
  } catch (error: any) {
    console.error("❌ Failed to get stones:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

const getFilteredStones = async (req: any, res: any) => {
  try {
    console.log("sagy22");

    const { stoneType } = req.body;
    const filters = req.body || {};
    // console.log("sagy27", body);

    // console.log("sagy23", { stoneType, ...filters });

    let model;
    if (stoneType === "Lab Grown") {
      model = StoneBBLab;
    } else if (stoneType === "Natural") {
      model = StoneBBNatural;
    } else {
      return res
        .status(400)
        .json({ message: "Missing or invalid stoneType in request body" });
    }

    // Clean up filters (remove undefined or empty values)
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );

    const stones = await MongoDbService.getByBody(model, filters);

    return res.status(200).json({ bbStones: stones });
    // return res.status(200).json({ bbStones: stones });
  } catch (error: any) {
    console.error("❌ Failed to get filtered stones:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

const getStone = async (req: any, res: any) => {
  try {
    const { stoneId } = req.params;
    const { stoneType } = req.query;

    if (!stoneId || !stoneType) {
      return res.status(400).json({ message: "Missing stoneId or stoneType" });
    }

    let stone;
    if (stoneType === "Lab Grown") {
      stone = await MongoDbService.getById(StoneBBLab, stoneId);
    } else if (stoneType === "Natural") {
      stone = await MongoDbService.getById(StoneBBNatural, stoneId);
    } else {
      return res.status(400).json({ message: "Invalid stone type" });
    }

    if (!stone) {
      return res.status(404).json({ message: "Stone not found" });
    }

    return res.status(200).json({ stone });
  } catch (error: any) {
    console.error("❌ Failed to get stone:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

// Update
const updateStone = async (req: any, res: any) => {
  try {
    const { stoneType, _id, ...updateData } = req.body;

    if (!stoneType || !_id) {
      return res.status(400).json({ message: "Missing stoneType or _id" });
    }

    let updatedStone;
    if (stoneType === "Lab Grown") {
      updatedStone = await MongoDbService.updateById(
        StoneBBLab,
        _id,
        updateData
      );
    } else if (stoneType === "Natural") {
      updatedStone = await MongoDbService.updateById(
        StoneBBNatural,
        _id,
        updateData
      );
    } else {
      return res.status(400).json({ message: "Invalid stone type" });
    }

    if (!updatedStone) {
      return res
        .status(404)
        .json({ message: "Stone not found or update failed" });
    }

    return res
      .status(200)
      .json({ message: "Stone updated successfully", updatedStone });
  } catch (error: any) {
    console.error("❌ Failed to update stone:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

// Delete
const deleteStone = async (req: any, res: any) => {
  try {
    const { stoneType, id } = req.query;

    if (!stoneType || !id || typeof id !== "string") {
      return res
        .status(400)
        .json({ message: "Missing or invalid stoneType or id" });
    }

    let deleted;
    if (stoneType === "Lab Grown") {
      deleted = await MongoDbService.deleteById(StoneBBLab, id);
    } else if (stoneType === "Natural") {
      deleted = await MongoDbService.deleteById(StoneBBNatural, id);
    } else {
      return res.status(400).json({ message: "Invalid stone type" });
    }

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Stone not found or already deleted" });
    }

    return res.status(200).json({ message: "Stone deleted successfully" });
  } catch (error: any) {
    console.error("❌ Failed to delete stone:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export default {
  createStone,
  getStones,
  getFilteredStones,
  getStone,
  updateStone,
  deleteStone,
};
