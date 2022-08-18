import { requestMethod } from "../../middlewares/router";
export interface IParamsConfig {
    [props: string]: {
        required?: boolean;
        type?: "number" | "string" | "boolean" | "object";
        defaultValue?: any;
        validator?: (param?: any) => [true] | [false, string];
    };
}
export interface IRequestOptions {
    params?: IParamsConfig;
}
export declare const createRequest: (target: any, cb: Function, options: {
    requestPath: string;
    requestMethod: requestMethod;
    handlerDesc: any;
}) => void;
export declare const checkParams: <T extends Object>(paramsConfig: IParamsConfig, params: T) => [true] | [false, string, number];
