import axios from "axios";
import { API_URL } from "@/config/config";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default axiosInstance;
