require("dotenv").config({ path: "./config.env" });

export const {
  APP_PORT,
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
} = process.env;
