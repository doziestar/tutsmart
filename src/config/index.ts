import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  VERIFICATION_BASE_URL,
  API_KEY,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_VERIFY_SERVICE_SID,
  TWILIO_MESSAGING_SERVICE_SID,
  JWT_EXPIRATION_TIME,
  ENAIRA_API_URL,
  ENAIRA_USER_API_URL,
  VIRTUAL_PAY_BASE_URL,
} = process.env;
