import { AreaSchema } from "../db";

class AreaService {

    public async createAreas(payload: any) {
        try {
            let id: number = await AreaSchema.getMaximumAreasId();
            //To add id count based on latest id's from DB
            for (let index = 0; index < payload.length; index++) {
                id = id + 1;
                payload[index].id = id;
            }
            //To insert a multiple areas of multiPolygon object 
            const areas = await AreaSchema.createAreas(payload);
            return areas

        } catch (error) {
            throw error;
        }
    }

    public async getArea(point: any) {
        try {
            // Retrieve the latest area/place that matches the given type[type might be Point,multipoint,polygon....] with latest oocurence
            const place = await AreaSchema.getAreaDetail(point);
            if (place == null) {
                throw new Error('Region is not found for given points')
            }
            return place;

        } catch (error) {
            throw error;
        }
    }

    public async updateAnArea(updateObject: any) {
        try {
            // Retrieve the latest area/place that matches the given type[type might be Point,multipoint,polygon....] from the updateObject
            const latestPlace=await this.getArea(updateObject.multiPolygon);
            // Remove the multiPolygon property from the updateObject since it's already used for retrieval
            delete updateObject.multiPolygon;
            // Iterate through the keys of the updateObject to replace db data with new payload data[e.g city state ...]
            Object.keys(updateObject).map((key:string)=>{
                latestPlace[key]=updateObject[key];
            })
            const place = await AreaSchema.updatArea(latestPlace)
            if (place == null) {
                throw new Error('Region is not found for given points')
            }
            return place;
        } catch (error) {
            throw error
        }
    }
}

const areaService = new AreaService();
export default areaService;