import axios from "axios";
import { server } from "../constants/config";

const axiosInstance = axios.create({
    baseURL: `${server}/api/v1`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;