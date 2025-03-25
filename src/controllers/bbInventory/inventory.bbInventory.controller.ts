import { Request, Response } from "express";
import StoneBBLab from "../../models/stones/stoneBBLab.model"; // ✅ adjust path if needed
import StoneBBNatural from "@src/models/stones/stoneBBNatural.model";
import MongoDbService from "@src/services/mongoDB.service";

const createStone = async (req: any, res: any) => {
  try {
    console.log(req);

    const body = req.body;
    let stone;
    // check stone type
    console.log("body", body);
    if (body.stoneType === "Lab Grown") {
      stone = await MongoDbService.create(StoneBBLab, body);
    } else if (body.stoneType === "Natural") {
      stone = await MongoDbService.create(StoneBBNatural, body);
    } else {
      return res.status(400).json({ message: "Invalid stone type" });
    }

    console.log("✅ New stone inserted:", stone);

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

export default {
  createStone,
  // getStones,
  // updateStone,
  // deleteStone,
};
