"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoute = exports.buildRoutes = exports.setupRouter = void 0;
var koa_router_1 = __importDefault(require("koa-router"));
var router;
var routeList = [];
var setupRouter = function () {
    router = new koa_router_1.default;
    return [router, routeList];
};
exports.setupRouter = setupRouter;
var buildRoutes = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
exports.buildRoutes = buildRoutes;
var addRoute = function (requestMethod, routeOptions) {
    var path = routeOptions.path, cb = routeOptions.cb, handlerDesc = routeOptions.handlerDesc;
    router[requestMethod](path, cb);
    routeList.push([requestMethod, handlerDesc, path]);
};
exports.addRoute = addRoute;
// export const useRouter = () => router;
