import Router from "koa-router";
import { tenonAppType } from "../core/app.interface";
export declare type requestMethod = 'get' | 'post' | 'put' | 'delete' | 'options';
interface IRouteOptions {
    path: string;
    cb: Router.IMiddleware;
    handlerDesc: string;
}
export declare type routeListType = [requestMethod, string, string][];
export declare const setupRouter: () => [Router<any, {}>, routeListType];
export declare const buildRoutes: (app: tenonAppType) => void;
export declare const addRoute: (requestMethod: requestMethod, routeOptions: IRouteOptions) => void;
export {};
