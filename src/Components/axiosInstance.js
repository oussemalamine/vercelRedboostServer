import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://kaleidoscopic-longma-44dbd6.netlify.app",
  withCredentials: true, // Important for sessions
});

// Interceptor to add CSRF token to outgoing requests
axiosInstance.interceptors.request.use(
  async function (config) {
    try {
      // Fetch CSRF token from your server
      const response = await axiosInstance.get("/get-csrf-token");
      const csrfToken = response.data.csrfToken;
      console.log(csrfToken);
      // Add CSRF token to headers
      config.headers["X-CSRF-Token"] = csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;