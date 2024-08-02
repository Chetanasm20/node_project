import { PlaceSchema } from "../db";

class PlaceService {
    public async createPlace(payload: any) {
        try {
            let id: number = await PlaceSchema.getMaximumPlacesId();
            for (let index = 0; index < payload.length; index++) {
                id = id + 1;
                payload[index].id = id;
                parseFloat(payload[index].location.coordinates[0]);
                parseFloat(payload[index].location.coordinates[1])
            }
            const places = await PlaceSchema.createPlaces(payload);
            return places

        } catch (error) {
            throw error;
        }
    }

    public async getPlaceDetailByCoordinateS(queryObj: any) {

        try {
            const place = await PlaceSchema.getPlaceDetailByCoordinates(queryObj);
            if (place == null) {
                throw new Error('Region is not found for given points')
            }
            return place;

        } catch (error) {
            throw error;
        }
    }

    public async updatePlaceByCoordinates(updateObject: any, queryObj: any) {
        try {
            const place = await PlaceSchema.updatePlaceByCoordinates(updateObject, queryObj)
            if (place == null) {
                throw new Error('Region is not found for given points')
            }
            return place;
        } catch (error) {
            throw error
        }
    }
}

const placeService = new PlaceService();
export default placeService;