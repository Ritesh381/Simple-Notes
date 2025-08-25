import axios from "axios";

const api = axios.create({
    baseURL: "https://simple-notes-km3c.onrender.com",
  // baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
