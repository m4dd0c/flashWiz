import axios from "axios";

// export const SERVER_URI = "http://192.168.195.49:4000";
// export const SERVER_URI = "http://192.168.249.185:4000";
export const SERVER_URI = "https://flashwiz-server.onrender.com";
export const instance = axios.create({
  baseURL: `${SERVER_URI}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // proxy: false,
});
