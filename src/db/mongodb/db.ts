import mongoose from 'mongoose';

import { DBConfiguration } from '../../config';

class MongoDbConfiguration {
  readonly MONGO_DISCONNECTED: number = 0;
  readonly MONGO_CONNECTED: number = 1;

  public connectToDatabase = async () => {
    const dbConfiguration = DBConfiguration.getDatabaseConfig();

    let URL = `${dbConfiguration.scheme}://${dbConfiguration.userName}:${dbConfiguration.password}@${dbConfiguration.host}${
      dbConfiguration.port != undefined ? ':' + dbConfiguration.port : ''
    }/${dbConfiguration.name}`;
    if (mongoose.connection.readyState === this.MONGO_DISCONNECTED) {
      console.log("URL ",URL);     
      await mongoose.connect(URL);
      return true;
    }
  };
  public getDatabaseInstance = () => {
    return mongoose;
  };
  public disconnectFromDatabase = async () => {
    if (mongoose.connection.readyState === this.MONGO_CONNECTED) {
      await mongoose.disconnect();
      return true;
    }
  };
}

const mongoConfiguration = new MongoDbConfiguration();

export default mongoConfiguration;
