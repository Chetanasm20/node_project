require('dotenv').config()
const apiServerPort=process.env.API_SERVER_PORT as string

export function getPortUrl():number{
return Number(apiServerPort);
}