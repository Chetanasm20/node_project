import { LocationSchema } from "../db";

class PlaceService {

    public async createLocations(payload: any) {
        try {
            let id: number = await LocationSchema.getMaximumLocationId();
            //To add id count based on latest id's from DB
            for (let index = 0; index < payload.length; index++) {
                id = id + 1;
                payload[index].id = id;
            }
            //To insert a multiple location of mulitpoints documents 
            const places = await LocationSchema.createLocations(payload);
            return places

        } catch (error) {
            throw error;
        }
    }

    public async getLocationDetailByCoordinateS(point: any) {
        try {
            //Gets th location base on point/multipoint with latest occurence data
            const place = await LocationSchema.getLocationDetailByCoordinates(point);
            if (place == null) {
                throw new Error('Region is not found for given points')
            }
            return place;

        } catch (error) {
            throw error;
        }
    }

    public async updateLocationByCoordinates(updateObject: any) {
        try {
            const latestPlace=await this.getLocationDetailByCoordinateS(updateObject.multiLocation);
            //Iterate over the update object keys to update an Db values e.g city,state .....
            Object.keys(updateObject).map((key:string)=>{
                latestPlace[key]=updateObject[key];
            })
            latestPlace.updatedDate=new Date();
            const place = await LocationSchema.updateLocationByCoordinates(latestPlace)
            if (place == null) {
                throw new Error('Region is not found for given points')
            }
            return place;
        } catch (error) {
            throw error
        }
    }
}

const locationService = new PlaceService();
export default locationService;