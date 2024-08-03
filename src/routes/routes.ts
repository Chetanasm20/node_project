
import locationRoute from "./api/location-routes";
import express from 'express';
import { PortConfiguration,HostConfiguartion } from "../config";
import cors from 'cors';
import { mongoConfiguration } from "../db";
import areaRoute from "./api/area-routes";

export const app=express()
const PORT:number=PortConfiguration.getPortUrl();
const HOST=HostConfiguartion.getHostUrl();
// Middleware to parse JSON bodies
app.use(express.json());

//This enables the server to accept requests from different origins
app.use(cors())
export const startServer = (): void => {
  mongoConfiguration.connectToDatabase();
    app.listen(PORT, HOST, () => {
      console.log(`Server is Up and Running on http://${HOST}:${PORT},`);
    });
  };
app.use('/locations',locationRoute)
app.use('/areas',areaRoute)



