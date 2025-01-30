import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:7999/", // ✅ Replace with your actual API
    headers: { "Content-Type": "application/json" },
});

// 🔹 Automatically attach access token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

// 🔹 Function to refresh token
const refreshToken = async () => {
    try {
        const response = await axios.post("http://127.0.0.1:7999/api/token/refresh/", {
            refresh: localStorage.removeItem('accessToken'),
        });

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

// 🔹 Axios interceptor for handling expired token
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

export default api;
