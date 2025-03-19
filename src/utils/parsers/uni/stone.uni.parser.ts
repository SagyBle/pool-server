export class UniStoneParser {
  /**
   * Parses raw uni stone data into a structured format to admin app.
   */
  static parse(stoneData: any) {
    if (!Array.isArray(stoneData)) {
      stoneData = [stoneData];
    }

    return stoneData.map((stone: any) => {
      console.log("sagy102", "stone before parsing", { stone });
      const stone_id = stone.stone_id;
      const mongodb_id = stone._id;

      const shape = this.normalizeShape(stone.shape);
      const weight = this.normalizeWeight(stone.carat);
      const color = this.normalizeColor(stone.color);

      const cut = this.normalizeCut(stone.cut);
      const lab = this.normalizeLab(stone.lab);
      const clarity = this.normalizeClarity(stone.clarity);

      const cost = this.normalizeCostPrice(stone.buy_price_total);
      const price = this.normalizePrice(stone.buy_price_total);
      const compareAtPrice = this.normalizeCompareAtPrice(
        stone.buy_price_total
      );

      const imageUrl = stone.sku_url;
      const alt = `${weight}ct ${color} ${shape}, ${cut}, ${clarity} image`;
      const media = [
        {
          alt,
          mediaContentType: "IMAGE",
          originalSource: imageUrl,
        },
      ];

      return {
        stone_id,
        mongodb_id,
        shape,
        weight,
        color,
        cut,
        lab,
        clarity,
        cost,
        price,
        compareAtPrice,
        media,
      };
    });
  }

  /**
   * Normalizes the shape value, handling both short and full forms
   */
  private static normalizeShape(shape: string): string {
    const shapeMap: Record<string, string> = {
      BR: "Round",
      Round: "Round",
      PR: "Princess",
      Princess: "Princess",
      EM: "Emerald",
      Emerald: "Emerald",
      AS: "Asscher",
      Asscher: "Asscher",
      CU: "Cushion",
      Cushion: "Cushion",
      RD: "Radiant",
      Radiant: "Radiant",
      OV: "Oval",
      Oval: "Oval",
      PS: "Pear",
      Pear: "Pear",
      MQ: "Marquise",
      Marquise: "Marquise",
      HT: "Heart",
      Heart: "Heart",
    };
    return shapeMap[shape] || "Unknown";
  }

  /**
   * Normalizes the cut value, handling both abbreviations and full names
   */
  private static normalizeCut(cut: string): string {
    const cutMap: Record<string, string> = {
      EX: "Excellent",
      Excellent: "Excellent",
      VG: "Very Good",
      "Very Good": "Very Good",
      GD: "Good",
      Good: "Good",
      FR: "Fair",
      Fair: "Fair",
      PR: "Poor",
      Poor: "Poor",
    };
    return cutMap[cut] || "Unknown";
  }

  /**
   * Normalizes the cut value into 2 numbers after the decimal point.
   */
  private static normalizeWeight(carat: number): string {
    console.log("sagy11", carat);
    return carat.toFixed(2);
  }

  private static normalizeColor(color: string): string {
    return color.toUpperCase();
  }

  private static normalizeClarity(clarity: string): string {
    return clarity;
  }

  private static normalizePrice(cost: number): string {
    const price = cost * 3; // 3x multiplier for price
    console.log("sagy10 - Price:", price);
    return price.toFixed(2);
  }

  private static normalizeCostPrice(cost: number): string {
    console.log("sagy10 - Cost:", cost);
    return cost.toFixed(2); // Cost remains unchanged (x)
  }

  private static normalizeCompareAtPrice(cost: number): string {
    const compareAtPrice = cost * 4.5; // 4.5x multiplier for compare-at price
    console.log("sagy10 - Compare At Price:", compareAtPrice);
    return compareAtPrice.toFixed(2);
  }

  private static normalizeLab(lab: string): string {
    return lab;
  }
}

export default UniStoneParser;
