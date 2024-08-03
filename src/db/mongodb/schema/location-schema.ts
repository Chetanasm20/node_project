import { Model } from "mongoose";
import mongoConfiguration from "../db"

const mongoConnection = mongoConfiguration.getDatabaseInstance();
console.log("mongoConnection ", mongoConnection);

const schemaTypes = mongoConnection.Schema.Types;
const LOCATION_MODEL = 'Location';

const LocationSchema = new mongoConnection.Schema({
    name: schemaTypes.String,
    id: schemaTypes.Number,
    city: schemaTypes.String,
    state: schemaTypes.String,
    coutry: schemaTypes.String,
    
    direction: schemaTypes.String,
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    multiLocationPoint: {
        type: {
            type: String,
            enum: ['MultiPoint'],
            required: true
        },
        coordinates: [
           { type: [Number],
            required: true}
        ]
    }
},
    { collection: 'locations' }
);

LocationSchema.index({ multiLocationPoint: '2dsphere' });
// LocationSchema.index({ polygon: '2dsphere' });


interface Place extends Model<any> {

    createLocations(payload: any): Promise<any>;
    getMaximumLocationId(): Promise<number>;
    getLocationDetailByCoordinates(polygon: any): Promise<any>;
    updateLocationByCoordinates(updateObject: any): Promise<any>;

}

LocationSchema.statics.createLocations = async (payload): Promise<any> => {
    try {
        const places = await mongoConnection.model(LOCATION_MODEL).insertMany(payload)
        return places;
    } catch (error) {
        throw error;
    }
}

LocationSchema.statics.getMaximumLocationId = async (): Promise<number> => {
    try {
        const places = await mongoConnection.model(LOCATION_MODEL).find({}).sort({ id: -1 }).limit(1);
        let maxId: number = 0;
        if (places.length > 0) {
            maxId = places[0].id;
        }
        return maxId;
    } catch (error) {
        throw error
    }
}

LocationSchema.statics.getLocationDetailByCoordinates = async (point: any): Promise<any> => {
    try {
        const place = await mongoConnection.model(LOCATION_MODEL).findOne({
            multiLocationPoint: {
              $geoIntersects: {
                $geometry: point
              }
            }
          }).sort({ id: -1 }).limit(1);
        return place;
    } catch (error) {
        throw error;
    }
}

LocationSchema.statics.updateLocationByCoordinates = async (updateObject: any): Promise<any> => {
    try {
        
        const place = await mongoConnection.model(LOCATION_MODEL).findOneAndUpdate({
            id: updateObject.id
        }, updateObject,{ new: true });
        return place;
    } catch (error) {
        throw error;
    }
}



export default mongoConnection.model<any, Place>(LOCATION_MODEL, LocationSchema);




