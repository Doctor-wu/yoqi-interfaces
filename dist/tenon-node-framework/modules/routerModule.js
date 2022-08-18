"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterModule = void 0;
var router_1 = require("../middlewares/router");
var baseModule_1 = require("./baseModule");
var RouterModule = /** @class */ (function (_super) {
    __extends(RouterModule, _super);
    function RouterModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RouterModule.prototype.init = function (app) {
        var _a;
        _super.prototype.init.call(this, app);
        app.$router = this;
        _a = (0, router_1.setupRouter)(), this.router = _a[0], this.routeList = _a[1];
    };
    RouterModule.prototype.buildRoutes = function () {
        (0, router_1.buildRoutes)(this.app);
    };
    return RouterModule;
}(baseModule_1.BaseModule));
exports.RouterModule = RouterModule;
