import { Request, Response } from 'express';
import { locationService } from '../service';


class PlaceHandler {

    public async createLocations(request: Request, response: Response) {
        try {
            const payload = request.body;
            const places = await locationService.createLocations(payload);
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

    public async getLocationByCordinantes(request: Request, response: Response) {
        try {
            const point = request.body;
            // this.validatePolygonObj(polygon);
            const place = await locationService.getLocationDetailByCoordinateS(point);
            response.status(200).json(place)
        } catch (error: any) {
            response.status(500).json({ message: error.message })
        }
    }

    public async updateLocationByCoordinates(request: Request, response: Response) {
        try {
            const updateObj = request.body;
            if(Object.keys(updateObj).length==0){
                throw new Error('Please provide a update object')
            }
            
            this.validatePolygonObj(updateObj.multiLocation);
            const place = await locationService.updateLocationByCoordinates(updateObj)
            response.status(200).json(place)
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }

    public validatePolygonObj(polygon: any) {

        if (!polygon.type ||!polygon.coordinates) {
            throw new Error("Please cross verify the polygon Object");
        }
    }
}

const placeHanldler = new PlaceHandler();
export default placeHanldler;