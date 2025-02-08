import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      return new Promise((resolve) => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              const token = await user.getIdToken(true);
              config.headers["Authorization"] = `Bearer ${token}`;
            } catch (error) {
              console.error("トークン取得エラー:", error);
            }
          }
          resolve(config);
        });
      });
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance();
