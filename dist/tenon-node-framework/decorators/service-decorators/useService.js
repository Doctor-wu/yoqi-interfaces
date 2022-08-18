"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useService = void 0;
var registry_1 = require("../../service/registry");
function useService(serviceName) {
    return function useServiceDecorator(target, propertyKey) {
        setTimeout(function () {
            Reflect.defineProperty(target, propertyKey, {
                get: function () {
                    return registry_1.serviceRegistry.get(serviceName);
                }
            });
        }, 4);
    };
}
exports.useService = useService;
