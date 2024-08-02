"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.app = void 0;
const place_route_1 = __importDefault(require("./api/place-route"));
const express_1 = __importDefault(require("express"));
const config_1 = require("../config");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("../db");
exports.app = (0, express_1.default)();
const PORT = config_1.PortConfiguration.getPortUrl();
const HOST = config_1.HostConfiguartion.getHostUrl();
// Middleware to parse JSON bodies
exports.app.use(express_1.default.json());
//This enables the server to accept requests from different origins
exports.app.use((0, cors_1.default)());
const startServer = () => {
    db_1.mongoConfiguration.connectToDatabase();
    exports.app.listen(PORT, HOST, () => {
        console.log(`Server is Up and Running on http://${HOST}:${PORT},`);
    });
};
exports.startServer = startServer;
exports.app.use('/places', place_route_1.default);
