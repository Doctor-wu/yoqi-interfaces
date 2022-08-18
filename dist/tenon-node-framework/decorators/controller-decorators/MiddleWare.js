"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleWare = void 0;
var registry_1 = require("../../controller/registry");
function MiddleWare(cb) {
    return function decorator(target, propertyKey, descriptor) {
        target.handlers = target.handlers || [];
        target.handlers.push(function (instance) {
            var store = (0, registry_1.getControllerStore)(instance.ControllerName);
            if (!store.middleware)
                store.middleware = {};
            if (!store.middleware[propertyKey])
                store.middleware[propertyKey] = [];
            store.middleware[propertyKey].push(cb);
        });
    };
}
exports.MiddleWare = MiddleWare;
