import {Request,Response,Router } from "express";
import { areaHandler } from "../../handler";
const areaRoute=Router({mergeParams:true})


areaRoute.post('/',async(request:Request,response:Response)=>{
    areaHandler.createAreas(request,response);
})

areaRoute.get('/',async(request:Request,response:Response)=>{
    areaHandler.getAnArea(request,response);
})

areaRoute.put('/',async(request:Request,response:Response)=>{
    areaHandler.updateAnArea(request,response);
})

export default areaRoute;