import { cleanEnv, str, port, url, num } from 'envalid';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
    desc: 'Node environment',
  }),
  PORT: port({ desc: 'API Port' }),
  MONGODB_URL: url({ desc: 'Mongo DB url' }),
  JWT_SECRET: str({ desc: 'Json Web Token Secret' }),
  JWT_ACCESS_EXPIRATION_MINUTES: num({
    desc: 'Number of minutes after which an access token expires',
  }),
  JWT_REFRESH_EXPIRATION_DAYS: num({
    desc: 'Number of days after which a refresh token expires',
  }),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: num({
    desc: 'Number of minutes after which a reset password token expires',
  }),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: num({
    desc: 'Number of minutes after which a verify email token expires',
  }),
});

export default env;
