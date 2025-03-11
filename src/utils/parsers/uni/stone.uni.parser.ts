interface Stone {
  stone_id: string;
  carat: string;
  color: string;
  shape: string;
  cut: string;
  clarity: string;
  buy_price_total: string;
  sku_url: string;
  sku_url_2?: string;
  sku_url_3?: string;
}

interface ParsedStone {
  shape: string;
  weight: string;
  color: string;
  cut: string;
  clarity: string;
  imageUrl: string;
  alt: string;
  price: string;
  media: { alt: string; mediaContentType: string; originalSource: string }[];
}

export class UniStoneParser {
  /**
   * Parses raw stone data into a structured format
   */
  static parse(stoneData: any): ParsedStone[] {
    return stoneData.map((stone: Stone) => {
      // Normalize values
      const shape = UniStoneParser.normalizeShape(stone.shape);
      const weight = parseFloat(stone.carat).toFixed(2);
      const color =
        stone.color.length === 1 ? stone.color.toUpperCase() : "Unknown";

      const cut = UniStoneParser.normalizeCut(stone.cut);
      const clarity = stone.clarity; // No normalization
      const price = parseFloat(stone.buy_price_total).toFixed(2);

      // Image & Media Handling
      const imageUrl = stone.sku_url || "";
      const alt = `${weight}ct ${color} ${shape}, ${cut}, ${clarity}`;
      const media = [
        {
          alt: `${weight}ct ${color} ${shape}, ${cut}, ${clarity} 1`,
          mediaContentType: "IMAGE",
          originalSource: imageUrl,
        },
      ];

      return {
        shape,
        weight,
        color,
        cut,
        clarity,
        imageUrl,
        alt,
        price,
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
}

export default UniStoneParser;
