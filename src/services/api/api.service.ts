import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface SpecialConfigs {
  timeout?: number;
  parseCsv?: boolean;
  additionalHeaders?: Record<string, string>;
}

class ApiService {
  protected baseURL: string;
  protected defaultHeaders: Record<string, string>;

  constructor(baseURL: string, credentials?: Record<string, string>) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...(credentials || {}),
    };
  }

  /**
   * General request method with optional special configs
   */
  protected async request(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: object,
    headers?: object,
    specialConfigs?: SpecialConfigs
  ): Promise<AxiosResponse | null> {
    try {
      const config: AxiosRequestConfig = {
        url: `${this.baseURL}${endpoint}`,
        method,
        data,
        headers: {
          ...this.defaultHeaders,
          ...headers,
          ...(specialConfigs?.additionalHeaders || {}),
        },
        timeout: specialConfigs?.timeout || 10000, // Default 900s unless overridden
      };

      const response = await axios(config);
      return response;
    } catch (error) {
      console.error(
        `❌ API Request Failed: ${method} ${this.baseURL}${endpoint}`,
        error
      );
      return null;
    }
  }

  /**
   * GET request
   */
  public async get(
    endpoint: string,
    headers?: object,
    specialConfigs?: SpecialConfigs
  ) {
    return await this.request(
      endpoint,
      "GET",
      undefined,
      headers,
      specialConfigs
    );
  }

  /**
   * POST request
   */
  public async post(
    endpoint: string,
    data: object,
    headers?: object,
    specialConfigs?: SpecialConfigs
  ) {
    return await this.request(endpoint, "POST", data, headers, specialConfigs);
  }

  /**
   * PUT request
   */
  public async put(
    endpoint: string,
    data: object,
    headers?: object,
    specialConfigs?: SpecialConfigs
  ) {
    return await this.request(endpoint, "PUT", data, headers, specialConfigs);
  }

  /**
   * DELETE request
   */
  public async delete(
    endpoint: string,
    headers?: object,
    specialConfigs?: SpecialConfigs
  ) {
    return await this.request(
      endpoint,
      "DELETE",
      undefined,
      headers,
      specialConfigs
    );
  }
}

export default ApiService;
