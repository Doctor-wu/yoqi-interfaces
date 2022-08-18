"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStatic = void 0;
var koa_static_1 = __importDefault(require("koa-static"));
var setupStatic = function (app, config) {
    var path = config.path;
    app.use((0, koa_static_1.default)(path));
};
exports.setupStatic = setupStatic;
