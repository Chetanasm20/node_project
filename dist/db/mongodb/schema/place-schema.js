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
const db_1 = __importDefault(require("../db"));
const mongoConnection = db_1.default.getDatabaseInstance();
console.log("mongoConnection ", mongoConnection);
const schemaTypes = mongoConnection.Schema.Types;
const PLACES_MODEL = 'Places';
const PlaceSchema = new mongoConnection.Schema({
    name: schemaTypes.String,
    city: schemaTypes.String,
    state: schemaTypes.String,
    coutry: schemaTypes.String,
    pincode: schemaTypes.String,
    latitude: schemaTypes.String,
    longitude: schemaTypes.String,
    direction: schemaTypes.String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, { collection: 'places' });
PlaceSchema.index({ location: '2dsphere' });
PlaceSchema.statics.createPlaces = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("@ schema");
        console.log("payload ", payload);
        const places = yield mongoConnection.model(PLACES_MODEL).insertMany(payload);
        return places;
    }
    catch (error) {
        throw error;
    }
});
PlaceSchema.statics.getMaximumPlacesId = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const places = yield mongoConnection.model(PLACES_MODEL).find({}).sort({ id: -1 }).limit(1);
        let maxId = 0;
        if (places.length > 0) {
            maxId = places[0].id;
        }
        return maxId;
    }
    catch (error) {
        throw error;
    }
});
exports.default = mongoConnection.model(PLACES_MODEL, PlaceSchema);
