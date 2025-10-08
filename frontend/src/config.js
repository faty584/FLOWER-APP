const isProduction = process.env.NODE_ENV === "production";

export const API_BASE_URL = isProduction
  ? "https://flower-delivery-backend1.onrender.com"
  : "http://localhost:4000"; // your backend port (change if different)
