import axios from "axios";

export const SERVER_URI = "https://flashwiz-server.onrender.com";
export const instance = axios.create({
  baseURL: `${SERVER_URI}/api/v1`,
  withCredentials: true,
});
