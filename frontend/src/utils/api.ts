import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:3001/api";

export const getAuthHeader = (): { Authorization: string } | undefined => {
  const token = localStorage.getItem("admin-token");
  if (!token) return undefined;
  return { Authorization: `Bearer ${token}` };
};

export const api = {
  /**
   * Get all items from a specific endpoint
   */
  getAll: async <T>(endpoint: string): Promise<T[]> => {
    const response = await axios.get<T[]>(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  },

  /**
   * Get a specific item by ID
   */
  getById: async <T>(endpoint: string, id: string): Promise<T> => {
    const response = await axios.get<T>(`${API_BASE_URL}/${endpoint}/${id}`);
    return response.data;
  },

  /**
   * Create a new item (requires authentication)
   */
  create: async <T>(endpoint: string, data: any): Promise<T> => {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      throw new Error("Authentication required.");
    }

    const config: AxiosRequestConfig = {
      headers: authHeader,
    };

    const response = await axios.post<T>(
      `${API_BASE_URL}/${endpoint}`,
      data,
      config
    );
    return response.data;
  },

  /**
   * Update an existing item (requires authentication)
   */
  update: async <T>(endpoint: string, id: string, data: any): Promise<T> => {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      throw new Error("Authentication required.");
    }

    const config: AxiosRequestConfig = {
      headers: authHeader,
    };

    const response = await axios.put<T>(
      `${API_BASE_URL}/${endpoint}/${id}`,
      data,
      config
    );
    return response.data;
  },

  /**
   * Delete an item (requires authentication)
   */
  delete: async (endpoint: string, id: string): Promise<void> => {
    const authHeader = getAuthHeader();
    if (!authHeader) {
      throw new Error("Authentication required.");
    }

    const config: AxiosRequestConfig = {
      headers: authHeader,
    };

    await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`, config);
  },

  /**
   * Authenticate user and get token
   */
  login: async (
    email: string,
    password: string
  ): Promise<{ token: string; user: any }> => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },
};

export default api;
