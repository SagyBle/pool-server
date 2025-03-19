export interface StoneParser {
  /**
   * Parses raw stone data into a structured format.
   */
  parse(stoneData: any): any;

  /**
   * Normalizes the shape value.
   */
  normalizeShape(shape: string): string;

  /**
   * Normalizes the weight to two decimal places.
   */
  normalizeWeight(carat: number): string;

  /**
   * Normalizes the color value.
   */
  normalizeColor(color: string): string;

  /**
   * Normalizes the cut value.
   */
  normalizeCut(cut: string): string;

  /**
   * Normalizes the clarity value.
   */
  normalizeClarity(clarity: string): string;

  /**
   * Normalizes the lab value.
   */
  normalizeLab(lab: string): string;

  /**
   * Normalizes the cost price (remains the same).
   */
  normalizeCostPrice(cost: number): string;

  /**
   * Normalizes the selling price (multiplies by 3).
   */
  normalizePrice(cost: number): string;

  /**
   * Normalizes the compare-at price (multiplies by 4.5).
   */
  normalizeCompareAtPrice(cost: number): string;
}
