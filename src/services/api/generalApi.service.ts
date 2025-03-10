import ApiService from "./api.service";

class GeneralApiService extends ApiService {
  constructor() {
    super("");
  }

  /**
   * Perform a request with a custom base URL.
   * @param baseURL - The base URL for the request.
   * @param endpoint - The specific API endpoint.
   * @param method - The HTTP method (GET, POST, etc.).
   * @param data - The request payload (for POST/PUT).
   * @param headers - Additional headers.
   */
  public async requestWithBaseURL(
    baseURL: string,
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: object,
    headers?: object
  ) {
    this.baseURL = baseURL; // Set base URL dynamically for this request
    return await this.request(endpoint, method, data, headers);
  }
}

export default new GeneralApiService();
