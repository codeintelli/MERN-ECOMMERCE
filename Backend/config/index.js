require("dotenv").config({ path: "./config.env" });

export const {
  PORT,
  DB_URL,
  DEBUG_MODE,
  JWT_SECRET,
  JWT_EXPIRE,
  COOKIE_EXPIRE,
  SMTP_MAIL,
  SMTP_SERVICE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_PASS,
  STRIPE_API_KEY,
  STRIPE_SECRET_KEY,
  FRONTEND_URL,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUDINARY_URL,
} = process.env;
