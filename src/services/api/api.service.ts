import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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
   * General request method
   */
  protected async request(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: object,
    headers?: object
  ): Promise<AxiosResponse | null> {
    try {
      const config: AxiosRequestConfig = {
        url: `${this.baseURL}${endpoint}`,
        method,
        data,
        headers: {
          ...this.defaultHeaders,
          ...headers, // Merge custom headers
        },
        timeout: 10000,
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
  public async get(endpoint: string, headers?: object) {
    return await this.request(endpoint, "GET", undefined, headers);
  }

  /**
   * POST request
   */
  public async post(endpoint: string, data: object, headers?: object) {
    return await this.request(endpoint, "POST", data, headers);
  }

  /**
   * PUT request
   */
  public async put(endpoint: string, data: object, headers?: object) {
    return await this.request(endpoint, "PUT", data, headers);
  }

  /**
   * DELETE request
   */
  public async delete(endpoint: string, headers?: object) {
    return await this.request(endpoint, "DELETE", undefined, headers);
  }
}

export default ApiService;
