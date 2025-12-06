import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor to add token
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

// Response interceptor for unified error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorResponse = {
            success: false,
            message: error.response?.data?.message || error.message || "An error occurred",
            errors: error.response?.data?.errors || []
        };

        // Auto-logout on 401
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        return Promise.reject(errorResponse);
    }
);

// Auth API
export const authAPI = {
    login: (credentials) => api.post("/auth/login", credentials),
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
    isAuthenticated: () => !!localStorage.getItem("token"),
    getUser: () => JSON.parse(localStorage.getItem("user") || "null")
};

// Bodies API
export const bodiesAPI = {
    getAll: (params = {}) => api.get("/bodies", { params }),
    getOne: (idOrSlug) => api.get(`/bodies/${idOrSlug}`),
    getBySlug: (slug) => api.get(`/bodies/slug/${slug}`),
    create: (data) => api.post("/bodies", data),
    update: (idOrSlug, data) => api.put(`/bodies/${idOrSlug}`, data),
    delete: (idOrSlug) => api.delete(`/bodies/${idOrSlug}`)
};

export default api;
