import { Request, Response } from 'express';
import { placeService } from '../service';


class PlaceHandler {

    public async createPlace(request: Request, response: Response) {
        try {
            const payload = request.body;
            this.validatePayload(payload);
            const places = await placeService.createPlace(payload);
            response.status(200).json(places)
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }

    public validatePayload(places: any[]) {
        for (let index = 0; index < places.length; index++) {
            if (!places[index].name || !places[index].location || places[index].location.type != "Point" || places[index].location.coordinates.length != 2) {
                throw new Error('Please provide the required fields: name,and location in type and coordinates');
            }
        }

    }

    public async getPlaceByCordinantes(request: Request, response: Response) {
        try {
            const queryObject = request.query;
            this.validateLatAndLongitude(queryObject);
            const place = await placeService.getPlaceDetailByCoordinateS(queryObject);
            response.status(200).json(place)
        } catch (error: any) {
            response.status(500).json({ message: error.message })
        }
    }

    public async updatePlaceByCoordinates(request: Request, response: Response) {
        try {
            const updateObj = request.body;
            if(Object.keys(updateObj).length==0){
                throw new Error('Please provide a update object')
            }
            const queryObj = request.query;
            this.validateLatAndLongitude(queryObj);
            const place = await placeService.updatePlaceByCoordinates(updateObj, queryObj)
            response.status(200).json(place)
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }

    public validateLatAndLongitude(queryObj: any) {
        if (!queryObj.latitude || !queryObj.longitude) {
            throw new Error("Please cross verify the lat and long points");
        }
    }
}

const placeHanldler = new PlaceHandler();
export default placeHanldler;