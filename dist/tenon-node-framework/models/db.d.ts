import { Mongoose } from "mongoose";
import { IServerConfig } from "../core/app.interface";
export declare const establishDBConnection: (config: IServerConfig) => Promise<Mongoose>;
