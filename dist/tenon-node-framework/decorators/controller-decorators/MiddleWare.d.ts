import { TypeMiddleware } from "../../controller/controller-core.interface";
export declare function MiddleWare(cb: TypeMiddleware): (target: any, propertyKey: any, descriptor: any) => void;
