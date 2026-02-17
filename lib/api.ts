import { ContactFormData } from "./validation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      return data as ApiResponse<T>;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async submitContactForm(formData: ContactFormData): Promise<ApiResponse> {
    return this.request("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }
}

export const apiClient = new ApiClient();
