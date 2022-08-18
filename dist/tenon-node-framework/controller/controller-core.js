"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = exports.createControllerInstance = exports.initControllers = void 0;
var io_1 = require("../core/io");
var response_1 = require("./response");
var share_1 = require("../../utils/share");
var initControllers = function (app) {
    var _a, _b;
    var controllers = app.$config.controllers;
    if (!controllers)
        return;
    app.$controllers = {};
    /** 实例化Controllers */
    controllers.forEach(function (Controller) {
        (0, exports.createControllerInstance)(app, Controller);
    });
    (0, share_1.compose)(io_1.io.moduleStyle, io_1.io.log)('Controller initd');
    /** 打印路由列表 */
    var requestMethodColor = {
        get: io_1.io.hex('#3339f3'),
        post: io_1.io.successStyle,
        put: io_1.io.chalk.cyanBright,
        delete: io_1.io.errorStyle,
        options: io_1.io.logStyle,
    };
    (_a = app.$router) === null || _a === void 0 ? void 0 : _a.routeList.forEach(function (_a) {
        var requestMethod = _a[0], handlerDesc = _a[1], requestPath = _a[2];
        io_1.io.log((0, share_1.compose)(io_1.io.bold, requestMethodColor[requestMethod])("\u3010 ".concat(requestMethod.toUpperCase(), " ").concat(requestPath, " \u3011")), io_1.io.logStyle("".concat(handlerDesc)));
    });
    /** 收集完路由后装载路由 */
    (_b = app.$router) === null || _b === void 0 ? void 0 : _b.buildRoutes();
    (0, share_1.compose)(io_1.io.moduleStyle, io_1.io.log)('Router initd');
};
exports.initControllers = initControllers;
var createControllerInstance = function (app, Ctor) {
    var instance = new Ctor(app);
    app.$controllers[instance.ControllerName] = instance;
    io_1.io.log("- ".concat(instance.ControllerName));
    return instance;
};
exports.createControllerInstance = createControllerInstance;
var BaseController = /** @class */ (function () {
    function BaseController(app) {
        this.middleware = [];
        this.app = app;
    }
    BaseController.prototype.getSpecifiedFieldParams = function (params, fields) {
        var result = {};
        fields.forEach(function (fieldKey) {
            if (params[fieldKey])
                result[fieldKey] = params[fieldKey];
        });
        return result;
    };
    BaseController.prototype.response = function (ctx, next) {
        return function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ctx.body = data;
                            return [4 /*yield*/, next()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
    BaseController.prototype.responseJson = function (ctx, next) {
        return function (data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var responseJson;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            responseJson = (0, response_1.createResponseJson)(data);
                            ctx.body = responseJson;
                            return [4 /*yield*/, next()];
                        case 1:
                            _a.sent();
                            if (!options.noLog)
                                io_1.io.log(responseJson);
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
    BaseController.prototype.responseError = function (ctx, next) {
        return function (errorCode, errorMsg) {
            return __awaiter(this, void 0, void 0, function () {
                var errorJson;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            errorJson = (0, response_1.createErrorJson)(errorCode, errorMsg);
                            ctx.body = errorJson;
                            return [4 /*yield*/, next()];
                        case 1:
                            _a.sent();
                            io_1.io.error(JSON.stringify(errorJson));
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
    BaseController.prototype.smartResponse = function (ctx, next) {
        var self = this;
        return function (error, result) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!error) return [3 /*break*/, 2];
                            return [4 /*yield*/, self.responseError(ctx, next)(1111, error.message || error)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, self.responseJson(ctx, next)(result)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
    };
    return BaseController;
}());
exports.BaseController = BaseController;
