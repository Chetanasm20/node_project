import { Request, Response } from 'express';
import { areaService } from '../service';


class AreaHandler {

    public async createAreas(request: Request, response: Response) {
        try {
            const payload = request.body;
            //changes
            // this.validatePayload(payload);
            const places = await areaService.createAreas(payload);
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

    public async getAnArea(request: Request, response: Response) {
        try {
            const point = request.body;
            const area = await areaService.getArea(point);
            response.status(200).json(area)
        } catch (error: any) {
            response.status(500).json({ message: error.message })
        }
    }

    public async updateAnArea(request: Request, response: Response) {
        try {
            const updateObj = request.body;
            if(Object.keys(updateObj).length==0){
                throw new Error('Please provide a update object')
            }           
            this.validatePolygonObj(updateObj.multiPolygon);
            const place = await areaService.updateAnArea(updateObj)
            response.status(200).json(place)
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }

    public validatePolygonObj(polygon: any) {
        if (!polygon.type || !polygon.coordinates) {
            throw new Error("Please cross verify the polygon Object");
        }
    }
}

const areaHandler = new AreaHandler();
export default areaHandler;