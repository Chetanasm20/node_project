require('dotenv').config();
const dbConfiguration = {
  scheme: process.env.DB_SCHEME as string,
  userName: process.env.DB_USER_NAME as string,
  password: process.env.DB_PASSWORD as string,
  name: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  port: process.env.DB_PORT,
};

export function getDatabaseConfig() {
  return dbConfiguration;
}
