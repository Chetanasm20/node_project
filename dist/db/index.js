"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceSchema = exports.mongoConfiguration = void 0;
const db_1 = __importDefault(require("./mongodb/db"));
exports.mongoConfiguration = db_1.default;
const mongodb_1 = require("./mongodb");
Object.defineProperty(exports, "PlaceSchema", { enumerable: true, get: function () { return mongodb_1.PlaceSchema; } });
