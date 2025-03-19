import { StoneParser } from "../stone.parser.interface";

export class UniStoneParser implements StoneParser {
  /**
   * Parses raw uni stone data into a structured format.
   */
  public parse(stoneData: any) {
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

  public normalizeShape(shape: string): string {
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

  public normalizeCut(cut: string): string {
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

  public normalizeWeight(carat: number): string {
    console.log("sagy11", carat);
    return carat.toFixed(2);
  }

  public normalizeColor(color: string): string {
    return color.toUpperCase();
  }

  public normalizeClarity(clarity: string): string {
    return clarity;
  }

  public normalizePrice(cost: number): string {
    const price = cost * 3; // 3x multiplier for price
    console.log("sagy10 - Price:", price);
    return price.toFixed(2);
  }

  public normalizeCostPrice(cost: number): string {
    console.log("sagy10 - Cost:", cost);
    return cost.toFixed(2); // Cost remains unchanged (x)
  }

  public normalizeCompareAtPrice(cost: number): string {
    const compareAtPrice = cost * 4.5; // 4.5x multiplier for compare-at price
    console.log("sagy10 - Compare At Price:", compareAtPrice);
    return compareAtPrice.toFixed(2);
  }

  public normalizeLab(lab: string): string {
    return lab;
  }
}

export default UniStoneParser;
