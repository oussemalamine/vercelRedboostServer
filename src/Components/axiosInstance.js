import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://redboost-fordeploy.onrender.com",
  withCredentials: true, // Important for sessions
});

export default axiosInstance;
