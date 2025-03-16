import { parse } from "csv-parse/sync"; // CSV parser
import ApiService from "../api/api.service";
import dotenv from "dotenv";

class UniApiService extends ApiService {
  constructor() {
    dotenv.config();

    super(process.env.UNI_API_URL || "", {
      "X-Api-User": process.env.UNI_API_USER || "",
      "X-Api-Password": process.env.UNI_API_PASSWORD || "",
    });
  }

  /**
   * POST request with optional CSV parsing via specialConfigs
   */
  public async post<T>(
    endpoint: string,
    data: object = {},
    headers: object = {},
    specialConfigs?: { timeout?: number; parseCsv?: boolean }
  ): Promise<T | null> {
    const response: any = await super.post(
      endpoint,
      data,
      headers,
      specialConfigs
    );
    if (!response) return null;

    try {
      if (specialConfigs?.parseCsv) {
        return parse(response.data, {
          columns: true,
          skip_empty_lines: true,
        }) as T;
      } else {
        return response.data as T;
      }
    } catch (error) {
      console.error("❌ Parsing Failed:", error);
      return null;
    }
  }
}

export default new UniApiService();
