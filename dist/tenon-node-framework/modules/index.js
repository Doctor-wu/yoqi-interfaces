"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModules = void 0;
var connectionModule_1 = require("./connectionModule");
var loggerModule_1 = require("./loggerModule");
var routerModule_1 = require("./routerModule");
var modules = [
    new loggerModule_1.LogModule,
    new connectionModule_1.ConnectionModule,
    new routerModule_1.RouterModule,
];
var initModules = function (app) {
    modules.forEach(function (module) {
        module.init(app);
    });
};
exports.initModules = initModules;
