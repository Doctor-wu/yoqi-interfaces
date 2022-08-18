"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getControllerStore = exports.controllerRegistry = void 0;
exports.controllerRegistry = new Map();
var getControllerStore = function (name) {
    var store = exports.controllerRegistry.get(name);
    if (!store)
        exports.controllerRegistry.set(name, (store = {}));
    return store;
};
exports.getControllerStore = getControllerStore;
