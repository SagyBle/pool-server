export class FiltersUniStoneParser {
  /**
   * Parses raw uni stone data into a structured format.
   */
  public static parse(filters: any) {
    console.log("sagy145", filters);

    const parsedFilters: Record<string, any> = {};

    if (filters.shape) {
      parsedFilters.shape = this.normalizeShapeToCode(filters.shape);
    }

    if (filters.cut) {
      parsedFilters.cut = this.normalizeCutToCode(filters.cut);
    }

    if (filters.carat) {
      parsedFilters.carat = this.normalizeExactWeight(filters.carat);
    }

    if (filters.caratMin && filters.caratMax) {
      parsedFilters.carat = this.normalizeRangeWeight(
        filters.caratMin,
        filters.caratMax
      );
      console.log("sagy146", parsedFilters.caratRange);
    }

    if (filters.color) {
      parsedFilters.color = this.normalizeColor(filters.color);
    }

    if (filters.clarity) {
      parsedFilters.clarity = this.normalizeClarity(filters.clarity);
    }

    if (filters.cost !== undefined && filters.cost !== null) {
      parsedFilters.cost = this.normalizeCostPrice(filters.cost);
      parsedFilters.price = this.normalizePrice(filters.cost);
      parsedFilters.compareAtPrice = this.normalizeCompareAtPrice(filters.cost);
    }

    if (filters.lab) {
      parsedFilters.lab = this.normalizeLab(filters.lab);
    }

    // if (filters.stoneType) {
    //   parsedFilters.stoneType = this.normalizeStoneType(filters.stoneType);
    // }

    console.log("sagy150", parsedFilters);

    return parsedFilters;
  }

  // 🔄 Normalize human-readable OR shorthand shape to shorthand code (e.g. "Oval" → "OV")
  public static normalizeShapeToCode(shape: string): string {
    const shapeCodeMap: Record<string, string> = {
      BR: "BR",
      Round: "BR",
      PR: "PR",
      Princess: "PR",
      EM: "EM",
      Emerald: "EM",
      AS: "AS",
      Asscher: "AS",
      CU: "CU",
      Cushion: "CU",
      RD: "RD",
      Radiant: "RD",
      OV: "OV",
      Oval: "OV",
      PS: "PS",
      Pear: "PS",
      MQ: "MQ",
      Marquise: "MQ",
      HT: "HT",
      Heart: "HT",
    };
    return shapeCodeMap[shape] || "Unknown";
  }

  // 🔄 Filterized version (gets pretty label for Shopify/metafield)
  public static filterizeShape(shape: string): string {
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

  // 🔄 Normalize cut to its code (e.g. "Very Good" → "VG")
  public static normalizeCutToCode(cut: string): string {
    const cutCodeMap: Record<string, string> = {
      Excellent: "EX",
      EX: "EX",
      "Very Good": "VG",
      VG: "VG",
      Good: "GD",
      GD: "GD",
      Fair: "FR",
      FR: "FR",
      Poor: "PR",
      PR: "PR",
    };
    return cutCodeMap[cut] || "Unknown";
  }

  // 🔄 Filterized cut (metafield-ready)
  public static normalizeCut(cut: string): string {
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

  // 🎯 Normalize carat to string with 2 decimal points
  public static normalizeExactWeight(carat: number | string): number {
    const num = Number(carat);
    return num;
  }

  public static normalizeRangeWeight(
    caratMin: number | string,
    caratMax: number | string
  ): { $gte: number; $lte: number } | undefined {
    const min = Number(caratMin);
    const max = Number(caratMax);

    if (isNaN(min) || isNaN(max)) {
      console.warn("❌ Invalid carat range:", { caratMin, caratMax });
      return undefined;
    }

    if (min > max) {
      console.warn("❌ Carat min must be less than or equal to max:", {
        min,
        max,
      });
      return undefined;
    }

    return {
      $gte: min,
      $lte: max,
    };
  }
  // TODO: continure from here return the sacle in +- 0.20

  // 🎯 Normalize color to uppercase
  public static normalizeColor(color: string): string {
    return color.toUpperCase();
  }

  // ✅ Clarity remains as-is
  public static normalizeClarity(clarity: string): string {
    return clarity;
  }

  // 💰 Price = cost * 3
  public static normalizePrice(cost: number): string {
    const price = cost * 3;
    return price.toFixed(2);
  }

  // 💰 Cost stays the same
  public static normalizeCostPrice(cost: number): string {
    return cost.toFixed(2);
  }

  // 💰 Compare At Price = cost * 4.5
  public static normalizeCompareAtPrice(cost: number): string {
    const compareAtPrice = cost * 4.5;
    return compareAtPrice.toFixed(2);
  }

  // 🧪 Lab remains as-is
  public static normalizeLab(lab: string): string {
    return lab;
  }

  public static normalizeStoneType(stoneType: string): string {
    const normalized = stoneType.trim().toLowerCase();

    const labValues = [
      "lab",
      "lg",
      "labgrown",
      "lab grown",
      "lab-grown",
      "labg",
      "labg.",
    ];
    const naturalValues = ["natural", "nat", "natural diamond", "n", "natr"];

    if (labValues.includes(normalized)) {
      return "Lab Grown";
    }

    if (naturalValues.includes(normalized)) {
      return "Natural";
    }
    return "";
  }
}
