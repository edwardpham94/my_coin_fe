/** @format */

import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = Cookies.get("accessToken");
    console.log("Token from cookies:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Ensure the response is returned as-is
    return response.data;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
