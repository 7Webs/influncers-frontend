import axios from "axios";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import { toast } from "react-toastify";

const api = axios.create({
  //   baseURL: " http://localhost:3000",
  baseURL: "https://clownfish-app-4jmg2.ondigitalocean.app/",
});

const firebaseTokenInterceptor = async (config) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      config.headers["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }
  }

  return config;
};

api.interceptors.request.use(firebaseTokenInterceptor);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  delete: (url, config) => api.delete(url, config),
  patch: (url, data, config) => api.patch(url, data, config),
};
