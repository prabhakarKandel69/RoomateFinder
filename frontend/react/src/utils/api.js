import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: "http://127.0.0.1:7999/", // ✅ Replace with your actual API
    headers: { "Content-Type": "application/json" },
});

// 🔹 Check if the access token exists and is expired
const isTokenExpired = (token) => {
    if (!token) return true; // No token means it's expired or missing
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now(); // Check if token expiry is in the past
    } catch (error) {
        return true; // Invalid token, consider expired
    }
};

// 🔹 Function to refresh token
const refreshToken = async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) {
        window.location.href = "/"; // 🚀 Redirect to login if refresh token is missing
        return null;
    }

    try {
        const response = await axios.post("http://127.0.0.1:7999/api/token/refresh/", { refresh });

        if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.access);
            return response.data.access;
        } else {
            throw new Error("Refresh token expired");
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/"; // 🚀 Redirect to login page
    }
};

// 🔹 Auto-refresh token if expired before making requests
api.interceptors.request.use(async (config) => {
    let token = localStorage.getItem("accessToken");

    if (isTokenExpired(token)) {
        token = await refreshToken(); // Refresh the token if expired
    }

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});

// 🔹 Handle 401 Unauthorized responses (force refresh if needed)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
                error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return api(error.config); // 🔄 Retry failed request
            }
        }
        return Promise.reject(error);
    }
);

// 🔹 Redirect to /dashboard if access token is valid
(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !isTokenExpired(accessToken) && window.location.pathname === "/") {
        window.location.href = "/dashboard";
    }
})();

export default api;
