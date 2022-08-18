import { IControllerConfig } from "./Controller.interface";
/**
 * Controller的装饰器，所有Controller都会被收集起来同时被实例化
 * @param config IControllerConfig
 */
export declare function Controller(config: IControllerConfig): ClassDecorator;
