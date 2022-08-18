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
exports.Service = void 0;
var registry_1 = require("../../service/registry");
function Service(config) {
    var schema = config.schema, name = config.name;
    return function serviceDecorator(Ctor) {
        // 返回一个新的类，继承自所装饰的Service
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                _this.serviceName = name || Ctor.name;
                _this.schemaInstance = schema;
                _this.buildModel();
                registry_1.serviceRegistry.set(_this.serviceName, _this);
                return _this;
            }
            return class_1;
        }(Ctor));
    };
}
exports.Service = Service;
