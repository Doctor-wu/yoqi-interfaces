import { tenonAppType } from "../core/app.interface";
import { io } from "../core/io";
import Koa from "koa";
import { createErrorJson, createResponseJson } from "./response";
import { compose } from "../../utils/share";
import { IDecoratedControllerExtraFields, TypeMiddleware } from "./controller-core.interface";
import { IDecoratedController } from "../decorators/controller-decorators/Controller.interface";
import { requestMethod } from "../middlewares/router";
export const initControllers = (app: tenonAppType) => {
  const { controllers } = app.$config;
  if (!controllers) return;
  app.$controllers = {};

  /** 实例化Controllers */
  controllers.forEach(Controller => {
    createControllerInstance(app, Controller);
  });

  compose(io.moduleStyle, io.log)('Controller initd');

  /** 打印路由列表 */
  const requestMethodColor: Record<requestMethod, any> = {
    get: io.hex('#3339f3'),
    post: io.successStyle,
    put: io.chalk.cyanBright,
    delete: io.errorStyle,
    options: io.logStyle,
  }
  app.$router?.routeList.forEach(([requestMethod, handlerDesc, requestPath]) => {
    io.log(
      compose(io.bold, requestMethodColor[requestMethod])(`【 ${requestMethod.toUpperCase()} ${requestPath} 】`),
      io.logStyle(`${handlerDesc}`),
    );
  });

  /** 收集完路由后装载路由 */
  app.$router?.buildRoutes();

  compose(io.moduleStyle, io.log)('Router initd');
}

export const createControllerInstance = (app: tenonAppType, Ctor: { new(...args: any[]): BaseController }) => {
  const instance = new Ctor(app);
  app.$controllers![instance.ControllerName] = instance;
  io.log(`- ${instance.ControllerName}`);
  return instance;
}

export class BaseController implements IDecoratedControllerExtraFields {
  public app: tenonAppType;
  /** Get/Post 类的请求装饰器会给Controller的原型上添加handlers属性 */
  public handlers!: ((instance: BaseController) => void)[];
  /** Controller装饰器会为子类实例加上该属性 */
  public ControllerName!: string;
  /** Controller装饰器会为子类实例加上该属性 */
  // public prefixPath!: string;
  /** Controller装饰器会为子类加上该属性 */
  public static prefixPath: string;
  public subController?: IDecoratedController[];
  public middleware: TypeMiddleware[] = [];

  constructor(app: tenonAppType) {
    this.app = app;
  }

  getSpecifiedFieldParams<P extends any, T extends keyof P>(params: P, fields: T[]): Record<T, P[T]> {
    const result: Record<T, P[T]> = {} as Record<T, P[T]>;
    fields.forEach((fieldKey) => {
      if (params[fieldKey]) result[fieldKey] = params[fieldKey];
    });
    return result;
  }

  response(
    ctx: Koa.Context,
    next: Koa.Next,
  ) {
    return async function (data: any) {
      ctx.body = data;
      await next();
    }
  }

  responseJson(
    ctx: Koa.Context,
    next: Koa.Next,
  ) {
    return async function (data: any, options: {
      noLog?: boolean
    } = {}) {
      const responseJson = createResponseJson(data);
      ctx.body = responseJson;
      await next();
      if (!options.noLog) io.log(responseJson);
    }
  }

  responseError(
    ctx: Koa.Context,
    next: Koa.Next,
  ) {
    return async function (errorCode: number, errorMsg: string) {
      const errorJson = createErrorJson(errorCode, errorMsg);
      ctx.body = errorJson;
      await next();
      io.error(JSON.stringify(errorJson));
    }
  }

  smartResponse(
    ctx: Koa.Context,
    next: Koa.Next,
  ) {
    const self = this;
    return async function (error, result) {
      if (error) {
        await self.responseError(ctx, next)(1111, error.message || error);
      } else {
        await self.responseJson(ctx, next)(result);
      }
    }
  }
}
