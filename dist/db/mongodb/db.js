"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../config");
class MongoDbConfiguration {
    constructor() {
        this.MONGO_DISCONNECTED = 0;
        this.MONGO_CONNECTED = 1;
        this.connectToDatabase = () => __awaiter(this, void 0, void 0, function* () {
            const dbConfiguration = config_1.DBConfiguration.getDatabaseConfig();
            let URL = `${dbConfiguration.scheme}://${dbConfiguration.userName}:${dbConfiguration.password}@${dbConfiguration.host}${dbConfiguration.port != undefined ? ':' + dbConfiguration.port : ''}/${dbConfiguration.name}`;
            if (mongoose_1.default.connection.readyState === this.MONGO_DISCONNECTED) {
                console.log("URL ", URL);
                yield mongoose_1.default.connect("mongodb://admin:password@localhost:27022/TVS_CCP_CATALOG");
                return true;
            }
        });
        this.getDatabaseInstance = () => {
            return mongoose_1.default;
        };
        this.disconnectFromDatabase = () => __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.default.connection.readyState === this.MONGO_CONNECTED) {
                yield mongoose_1.default.disconnect();
                return true;
            }
        });
    }
}
const mongoConfiguration = new MongoDbConfiguration();
exports.default = mongoConfiguration;
