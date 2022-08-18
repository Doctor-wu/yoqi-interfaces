"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCors = void 0;
var cors_1 = __importDefault(require("@koa/cors"));
var constant_1 = require("../constant");
var setupCors = function (app) {
    app.use((0, cors_1.default)(constant_1.CONSTANT.defaultCorsConfig));
};
exports.setupCors = setupCors;
