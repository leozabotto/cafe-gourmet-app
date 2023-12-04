import axios from "axios";

export const apiCafe = axios.create({
  baseURL: "https://cafe-gourmet-api-production.up.railway.app",
});
