import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_MAIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
