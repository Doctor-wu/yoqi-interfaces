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
exports.Controller = void 0;
var controller_1 = require("../../controller");
var lodash_1 = require("lodash");
/**
 * Controller的装饰器，所有Controller都会被收集起来同时被实例化
 * @param config IControllerConfig
 */
function Controller(config) {
    var prefixPath = config.prefixPath, name = config.name, middleware = config.middleware;
    return function controllerDecorator(Ctor) {
        Ctor.prototype.ControllerName = name || Ctor.name;
        var DecoratedController = /** @class */ (function (_super) {
            __extends(DecoratedController, _super);
            function DecoratedController() {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                _this.ControllerName = name || Ctor.name;
                _this.ControllerName = name || Ctor.name;
                var handlers = _this.handlers;
                if (middleware) {
                    (_a = _this.middleware).push.apply(_a, middleware);
                }
                if (handlers)
                    handlers.forEach(function (handler) { return handler(_this); });
                if (_this.subController) {
                    _this.subController.forEach(function (Sub) {
                        Sub.prefixPath = DecoratedController.prefixPath + Sub.prefixPath;
                        if (_this.middleware.length) {
                            var handlers_1 = Reflect.getPrototypeOf(Sub.prototype).handlers;
                            handlers_1.push(function (instance) {
                                var _a;
                                (_a = instance.middleware).unshift.apply(_a, (0, lodash_1.cloneDeep)(_this.middleware));
                            });
                        }
                        (0, controller_1.createControllerInstance)(_this.app, Sub);
                    });
                }
                return _this;
            }
            DecoratedController.prefixPath = prefixPath;
            return DecoratedController;
        }(Ctor));
        ;
        return DecoratedController;
    };
}
exports.Controller = Controller;
