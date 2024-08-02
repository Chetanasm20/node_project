import { Model } from "mongoose";
import mongoConfiguration from "../db"

const mongoConnection = mongoConfiguration.getDatabaseInstance();
console.log("mongoConnection ", mongoConnection);

const schemaTypes = mongoConnection.Schema.Types;
const PLACES_MODEL = 'Places';

const PlaceSchema = new mongoConnection.Schema({
    name: schemaTypes.String,
    id: schemaTypes.Number,
    city: schemaTypes.String,
    state: schemaTypes.String,
    coutry: schemaTypes.String,
    pincode: schemaTypes.String,
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
},
    { collection: 'places' }
);

PlaceSchema.index({ location: '2dsphere' });

interface Place extends Model<any> {

    createPlaces(payload: any): Promise<any>;
    getMaximumPlacesId(): Promise<number>;
    getPlaceDetailByCoordinates(queryObj: any): Promise<any>;
    updatePlaceByCoordinates(updateObject:any,queryObj:any):Promise<any>;
}
PlaceSchema.statics.createPlaces = async (payload): Promise<any> => {
    try {
        const places = await mongoConnection.model(PLACES_MODEL).insertMany(payload)
        return places;
    } catch (error) {
        throw error;
    }
}

PlaceSchema.statics.getMaximumPlacesId = async (): Promise<number> => {
    try {
        const places = await mongoConnection.model(PLACES_MODEL).find({}).sort({ id: -1 }).limit(1);
        let maxId: number = 0;
        if (places.length > 0) {
            maxId = places[0].id;
        }
        return maxId;
    } catch (error) {
        throw error
    }
}

PlaceSchema.statics.getPlaceDetailByCoordinates = async (queryObj: any): Promise<any> => {
    try {
        const place = await mongoConnection.model(PLACES_MODEL).findOne({
            location:
            {
                type: 'Point',
                coordinates: [parseFloat(queryObj.latitude), parseFloat(queryObj.longitude)]
            }
        }).sort({ id: -1 }).limit(1);
        return place;
    } catch (error) {
        throw error;
    }
}

PlaceSchema.statics.updatePlaceByCoordinates = async (updateObject: any,queryObj:any): Promise<any> => {
    try {
        console.log("updateObject ",updateObject);        
        const place = await mongoConnection.model(PLACES_MODEL).findOneAndUpdate({
            location:
            {
                type: 'Point',
                coordinates: [parseFloat(queryObj.latitude), parseFloat(queryObj.longitude)]
            }
        }, updateObject);
        return place;
    } catch (error) {
        throw error;
    }
}



export default mongoConnection.model<any, Place>(PLACES_MODEL, PlaceSchema);




