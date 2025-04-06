import { Request, Response } from "express";
import StoneBBLab from "../../models/stones/stoneBBLab.model";
import StoneBBNatural from "@src/models/stones/stoneBBNatural.model";
import MongoDbService from "@src/services/mongoDB.service";
import { stonesVerndors } from "@src/enums/stonesVendors.enum";
import ApiService from "@src/services/api/api.service";
import uniApiService from "@src/services/uniApi/uni.api.service";
import StoneUniLab from "@src/models/stones/stoneUniLab.model";

// Create
const purchaseStoneFromVendor = async (req: any, res: any) => {
  try {
    const { stone_id, vendor, po_number } = req.body;

    if (!stone_id || !vendor || !po_number) {
      throw new Error("Missing required fields: stone_id, vendor, po_number");
    }

    if (vendor === stonesVerndors.BB) {
      console.log(
        `stone ${stone_id} purchased from BB inventory with PO number ${po_number}`
      );
      // TODO: Implement logic for BB vendor purchase
    } else if (vendor === stonesVerndors.UNI) {
      console.log(
        `stone ${stone_id} purchased from Uni inventory with PO number ${po_number}`
      );

      const response = await uniApiService.post("/home/buy", {
        stones: [stone_id],
        po_number,
      });

      const { status, data, msg }: any = response;

      if (status !== "1") {
        throw new Error(`UNI API purchase failed: ${msg}`);
      }

      console.log(`✅ sagy27 Uni order confirmed:`, data?.order_id);

      // Update the stone status in the database
      const stone = await MongoDbService.updateByField(
        StoneUniLab,
        "stone_id",
        stone_id,
        {
          purchased: { data, purchasedAt: Date.now() },
        }
      );

      console.log(`sagy28 stone was updated in DB:`, stone);

      return res.status(201).json({
        success: true,
        data: {
          order_id: data?.order_id,
          message: msg,
          sub_title: data?.sub_title,
          description: data?.description,
        },
      });
    } else {
      throw new Error(`Vendor ${vendor} is not supported`);
    }

    // Default success response for non-UNI vendors
    return res.status(201).json({
      success: true,
      message: "",
    });
  } catch (error: any) {
    console.error("❌ Failed to purchase stone:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

export default {
  purchaseStoneFromVendor,
};
