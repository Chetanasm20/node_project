"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostUrl = getHostUrl;
require('dotenv').config();
const HOST_URL = process.env.SERVER_HOST_URL;
function getHostUrl() {
    return HOST_URL;
}
