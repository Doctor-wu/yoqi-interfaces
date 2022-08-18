"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var koa_1 = __importDefault(require("koa"));
var io_1 = require("./io");
var constant_1 = require("../constant");
var models_1 = require("../models");
var modules_1 = require("../modules");
var controller_1 = require("../controller");
var service_1 = require("../service");
var share_1 = require("../../utils/share");
var lodash_1 = require("lodash");
__exportStar(require("./app.interface"), exports);
var createServer = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var startTime, server, port, name, koaApp, tenonApp;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                startTime = Date.now();
                server = config.server;
                port = server.port, name = server.name;
                koaApp = new koa_1.default();
                tenonApp = koaApp;
                tenonApp.$config = (0, lodash_1.mergeWith)({}, {
                    session: constant_1.CONSTANT.defaultSessionConfig,
                }, config);
                if ((_a = config.io) === null || _a === void 0 ? void 0 : _a.noEmit)
                    io_1.io.noEmit = true;
                if (!config.mongodb) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, models_1.initModels)(tenonApp)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2: 
            // modules
            return [4 /*yield*/, (0, modules_1.initModules)(tenonApp)];
            case 3:
                // modules
                _b.sent();
                if (!config.services) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, service_1.initServices)(tenonApp)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                if (!config.controllers) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, controller_1.initControllers)(tenonApp)];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                tenonApp.start = function () {
                    // listen
                    return new Promise(function (resolve) {
                        tenonApp.listen(port, function () {
                            io_1.io.log((0, share_1.compose)(io_1.io.bold, io_1.io.hex('#e81'))("".concat(name || constant_1.CONSTANT.defaultServerName)), "is running at", (0, share_1.compose)(io_1.io.bold, io_1.io.hex('#1e1'))("http://localhost:".concat(port)));
                            io_1.io.log(io_1.io.bold.white.bgHex('#a5f')('Server launch succeeded!'));
                            var endTime = Date.now();
                            io_1.io.log(io_1.io.successStyle.bold("Launch cost ".concat(endTime - startTime, "ms")));
                            tenonApp.emit('launched');
                            resolve('launched');
                        });
                    });
                };
                return [2 /*return*/, tenonApp];
        }
    });
}); };
exports.createServer = createServer;
