import { IServerConfig, tenonAppType } from "./app.interface";
export * from "./app.interface";
export declare const createServer: (config: IServerConfig) => Promise<tenonAppType>;
