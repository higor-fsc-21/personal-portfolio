import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:3001/api";

// Transform MongoDB _id to id
const transformMongoResponse = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => transformMongoResponse(item));
  }

  if (data && typeof data === "object") {
    const { _id, ...rest } = data;
    return _id ? { id: _id, ...rest } : rest;
  }

  return data;
};

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
    const response = await axios.get<T[]>(`${API_BASE_URL}/${endpoint}`, {
      headers: getAuthHeader(),
    });
    return transformMongoResponse(response.data);
  },

  /**
   * Get a specific item by ID
   */
  getById: async <T>(endpoint: string, id: string): Promise<T> => {
    const response = await axios.get<T>(`${API_BASE_URL}/${endpoint}/${id}`, {
      headers: getAuthHeader(),
    });
    return transformMongoResponse(response.data);
  },

  /**
   * Create a new item (requires authentication)
   */
  create: async (endpoint: string, data: any): Promise<any> => {
    const config = {
      headers: {
        ...getAuthHeader(),
        ...(data instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : {}),
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/${endpoint}`,
      data,
      config
    );
    return transformMongoResponse(response.data);
  },

  /**
   * Update an existing item (requires authentication)
   */
  update: async (endpoint: string, id: string, data: any): Promise<any> => {
    const config = {
      headers: {
        ...getAuthHeader(),
        ...(data instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : {}),
      },
    };

    const response = await axios.put(
      `${API_BASE_URL}/${endpoint}/${id}`,
      data,
      config
    );
    return transformMongoResponse(response.data);
  },

  /**
   * Delete an item (requires authentication)
   */
  delete: async (endpoint: string, id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`, {
      headers: getAuthHeader(),
    });
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
    return transformMongoResponse(response.data);
  },
};

export default api;
