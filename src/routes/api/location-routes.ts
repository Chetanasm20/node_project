import {Request,Response,Router } from "express";
import { placeHandler } from "../../handler";
const locationRoute=Router({mergeParams:true})


locationRoute.post('/',async(request:Request,response:Response)=>{
    placeHandler.createLocations(request,response);
})

locationRoute.get('/',async(request:Request,response:Response)=>{
    placeHandler.getLocationByCordinantes(request,response);
})

locationRoute.put('/',async(request:Request,response:Response)=>{
    placeHandler.updateLocationByCoordinates(request,response);
})

export default locationRoute;