const { cloudinary } = require("../cloudinary");

const dotenv = require("dotenv");

dotenv.config();

console.log("🧩 Cloudinary Config:", {
  name: process.env.CLOUDINARY_NAME,
  key: process.env.CLOUDINARY_KEY ? "✅ exists" : "❌ missing",
  secret: process.env.CLOUDINARY_SECRET ? "✅ exists" : "❌ missing",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;
