import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const isFormData = config.data instanceof FormData;

    // IMPORTANT: never touch FormData
    if (isFormData) {
      // Let browser set multipart boundaries
      delete config.headers?.["Content-Type"];

      if (process.env.NODE_ENV === "development") {
        console.log(
          "Sending multipart request:",
          config.baseURL! + config.url,
          "[FormData]"
        );
      }

      return config;
    }

    // JSON request handling
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Sending JSON request:",
        config.baseURL! + config.url,
        "RequestData:",
        config.data
      );
    }
    
    //@ts-ignore
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
    };

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Received response from backend:",
        response.config.baseURL! + response.config.url,
        "ResponseData:",
        response.data
      );
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
