import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Set to true if using cookies
});

// Optional request interceptor
api.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth?.token) {
      config.headers.Authorization = auth.token;
      // If your API expects Bearer token, use:
      // config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Optional response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here
    if (error.response?.status === 401) {
      console.warn("Unauthorized request");
      // localStorage.removeItem("auth");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
