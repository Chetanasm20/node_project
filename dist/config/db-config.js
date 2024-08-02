"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = getDatabaseConfig;
require('dotenv').config();
const dbConfiguration = {
    scheme: process.env.DB_SCHEME,
    userName: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
};
function getDatabaseConfig() {
    return dbConfiguration;
}
