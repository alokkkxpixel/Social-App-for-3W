import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: true
})


// add token automatic
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default API;
