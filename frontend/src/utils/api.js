import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  },
  updatePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.patch("/auth/password", {
        currentPassword,
        newPassword,
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error,
      };
    }
  },
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get("/admin/dashboard"),
  getUsers: (filters) =>
    api.get("/admin/users", {
      params: filters,
    }),
  getStores: (filters) =>
    api.get("/admin/stores", {
      params: filters,
    }),
  createUser: async (userData) => {
    try {
      const response = await api.post("/admin/users", userData);

      if (response.status === 400) {
        return {
          success: false,
          error: response.error,
        };
      }
      return {
        success: true,
        message: "User added successfully",
      };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error,
      };
    }
  },
  createStore: async (storeData) => {
    try {
      const response = await api.post("/admin/stores", storeData);

      if (response.status === 400) {
        return {
          success: false,
          error: response.error,
        };
      }
      return {
        success: true,
        message: "Store added successfully",
      };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error,
      };
    }
  },
};

// Store API for normal users and store owners
export const storeAPI = {
  getStores: (filters) =>
    api.get("/stores", {
      params: filters,
    }),
  rateStore: (storeId, rating) =>
    api.post(`/stores/${storeId}/rate`, { rating }),
  getOwnerDashboard: () => api.get("/stores/owner/dashboard"),
};

// Interceptors to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors to handle resposnes and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 402) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
