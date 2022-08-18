import { BaseController } from "./controller-core";
import { TypeMiddleware } from "./controller-core.interface";
export declare const controllerRegistry: Map<string, ControllerStore>;
declare type ControllerStore = {
    middleware?: Record<string, TypeMiddleware[]>;
    instance?: BaseController;
    handlers?: ((instance: BaseController) => void)[];
};
export declare const getControllerStore: (name: string) => ControllerStore;
export {};
