"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortUrl = getPortUrl;
require('dotenv').config();
const apiServerPort = process.env.API_SERVER_PORT;
function getPortUrl() {
    return Number(apiServerPort);
}
