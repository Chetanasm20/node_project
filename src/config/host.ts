require('dotenv').config()
const HOST_URL=process.env.SERVER_HOST_URL as string

export function getHostUrl():string{
return HOST_URL;
}