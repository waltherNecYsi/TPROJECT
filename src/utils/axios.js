import axios from "axios";
import { useEffect } from "react";
// config
import { HOST_API_KEY } from "../config-global";
import { useAuthContext } from "../auth/useAuthContext";

// ----------------------------------------------------------------------
// get sub
const storedToken = localStorage.getItem("accessToken") || "";

const axiosInstance = axios.create({
  baseURL: `http://${HOST_API_KEY}`,
  headers: {
    Accept: "/",
    // 'Content-Type': 'application/json',
    "Authorization": `Bearer ${storedToken}`,
    "X-Requested-With": "XMLHttpRequest",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    config.data = {
      ...config.data,
    };
    config.headers.Authorization = `Bearer ${token}` || "";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

