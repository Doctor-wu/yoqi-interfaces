import Router from "koa-router";
import { tenonAppType } from "../core/app.interface";
import { routeListType } from "../middlewares/router";
import { BaseModule } from "./baseModule";
export declare class RouterModule extends BaseModule {
    router: Router<any, {}>;
    routeList: routeListType;
    init(app: tenonAppType): void;
    buildRoutes(): void;
}
