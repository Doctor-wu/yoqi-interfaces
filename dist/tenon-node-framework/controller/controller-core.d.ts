import { tenonAppType } from "../core/app.interface";
import Koa from "koa";
import { IDecoratedControllerExtraFields, TypeMiddleware } from "./controller-core.interface";
import { IDecoratedController } from "../decorators/controller-decorators/Controller.interface";
export declare const initControllers: (app: tenonAppType) => void;
export declare const createControllerInstance: (app: tenonAppType, Ctor: new (...args: any[]) => BaseController) => BaseController;
export declare class BaseController implements IDecoratedControllerExtraFields {
    app: tenonAppType;
    /** Get/Post 类的请求装饰器会给Controller的原型上添加handlers属性 */
    handlers: ((instance: BaseController) => void)[];
    /** Controller装饰器会为子类实例加上该属性 */
    ControllerName: string;
    /** Controller装饰器会为子类实例加上该属性 */
    /** Controller装饰器会为子类加上该属性 */
    static prefixPath: string;
    subController?: IDecoratedController[];
    middleware: TypeMiddleware[];
    constructor(app: tenonAppType);
    getSpecifiedFieldParams<P extends any, T extends keyof P>(params: P, fields: T[]): Record<T, P[T]>;
    response(ctx: Koa.Context, next: Koa.Next): (data: any) => Promise<void>;
    responseJson(ctx: Koa.Context, next: Koa.Next): (data: any, options?: {
        noLog?: boolean;
    }) => Promise<void>;
    responseError(ctx: Koa.Context, next: Koa.Next): (errorCode: number, errorMsg: string) => Promise<void>;
    smartResponse(ctx: Koa.Context, next: Koa.Next): (error: any, result: any) => Promise<void>;
}
