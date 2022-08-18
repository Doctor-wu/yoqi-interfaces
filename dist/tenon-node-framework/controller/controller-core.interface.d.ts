import { RequestContext, tenonAppType } from "../core";
export interface IDecoratedControllerExtraFields {
    ControllerName: string;
    app: tenonAppType;
}
export declare type TypeMiddleware<T = [false, string] | [true]> = (options: {
    ctx: RequestContext;
    params: any;
}) => T | Promise<T>;
