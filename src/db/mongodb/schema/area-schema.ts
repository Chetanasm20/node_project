import { Model } from "mongoose";
import mongoConfiguration from "../db"

const mongoConnection = mongoConfiguration.getDatabaseInstance();
console.log("mongoConnection ", mongoConnection);

const schemaTypes = mongoConnection.Schema.Types;
const AREA_MODEL = 'Area';

const AreaSchema = new mongoConnection.Schema({
    name: schemaTypes.String,
    id: schemaTypes.Number,
    city: schemaTypes.String,
    state: schemaTypes.String,
    coutry: schemaTypes.String,
    
    direction: schemaTypes.String,
    multiPolygon: {
        type: {
          type: String,
          enum: ['MultiPolygon'],
          required: true
        },
        coordinates: [[[
          {type: [Number], // An array of arrays of arrays of numbers
          required: true}
        ]]]
      }
},
{ collection: 'areas' }
);

AreaSchema.index({ multiPolygon: '2dsphere' });


interface Place extends Model<any> {
    createAreas(payload: any): Promise<any>;
    getMaximumAreasId(): Promise<number>;
    getAreaDetail(polygon: any): Promise<any>;
    updatArea(updateObject: any): Promise<any>;
}
AreaSchema.statics.createAreas = async (payload): Promise<any> => {
    try {
        console.log("create an area");
        
        const areas = await mongoConnection.model(AREA_MODEL).insertMany(payload)
        return areas;
    } catch (error) {
        throw error;
    }
}

AreaSchema.statics.getMaximumAreasId = async (): Promise<number> => {
    try {
        const areas = await mongoConnection.model(AREA_MODEL).find({}).sort({ id: -1 }).limit(1);
        let maxId: number = 0;
        if (areas.length > 0) {
            maxId = areas[0].id;
        }
        return maxId;
    } catch (error) {
        throw error
    }
}

AreaSchema.statics.getAreaDetail = async (polygon: any): Promise<any> => {
    try {
        const area = await mongoConnection.model(AREA_MODEL).findOne({
            multiPolygon: {
              $geoIntersects: {
                $geometry: polygon
              }
            }
          }).sort({ id: -1 }).limit(1);
        return area;
    } catch (error) {
        throw error;
    }
}

AreaSchema.statics.updatArea = async (updateObject: any): Promise<any> => {
    try {        
        const area = await mongoConnection.model(AREA_MODEL).findOneAndUpdate({
            id: updateObject.id
        }, updateObject,{ new: true });
        return area;
    } catch (error) {
        throw error;
    }
}



export default mongoConnection.model<any, Place>(AREA_MODEL, AreaSchema);




