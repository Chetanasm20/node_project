import {Request,Response,Router } from "express";
import { placeHandler } from "../../handler";
const placeRoute=Router({mergeParams:true})

placeRoute.post('/',async(request:Request,response:Response)=>{
    placeHandler.createPlace(request,response);
})

placeRoute.get('/',async(request:Request,response:Response)=>{
    placeHandler.getPlaceByCordinantes(request,response);
})

placeRoute.put('/',async(request:Request,response:Response)=>{
    placeHandler.updatePlaceByCoordinates(request,response);
})

export default placeRoute;