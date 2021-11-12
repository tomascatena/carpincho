import { cleanEnv, str, port, url } from 'envalid';
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
});

export default env;
