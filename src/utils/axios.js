import axios from "axios";
// config
import { HOST_API_KEY } from "../config-global";
import { useAuthContext } from "../auth/useAuthContext";

// ----------------------------------------------------------------------
// get sub
const storedToken = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: `http://${HOST_API_KEY}`,
  headers: {
    Accept: "/",
    // 'Content-Type': 'application/json',
    Authorization: `Bearer ${storedToken}`,
    "X-Requested-With": "XMLHttpRequest",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const { user } = useAuthContext();
    config.data = {
      ...config.data,
      token: localStorage.getItem("accessToken"),
    };
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

// 403 forbiden usuario no inicio session
