import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;