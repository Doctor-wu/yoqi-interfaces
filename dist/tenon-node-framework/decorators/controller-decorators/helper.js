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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParams = exports.createRequest = void 0;
var status_code_1 = require("../../controller/status-code");
var io_1 = require("../../core/io");
var router_1 = require("../../middlewares/router");
var createRequest = function (target, cb, _a) {
    var requestPath = _a.requestPath, requestMethod = _a.requestMethod, handlerDesc = _a.handlerDesc;
    target.handlers = target.handlers || [];
    target.handlers.push(function (instance) {
        (0, router_1.addRoute)(requestMethod, {
            path: instance.constructor.prefixPath + requestPath,
            cb: function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, cb.call(instance, ctx, next)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            io_1.io.error("".concat(instance.ControllerName, " Error:"), e_1);
                            instance.responseError(ctx, next)(1111, "Internal Error: ".concat(e_1.toString()));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
            handlerDesc: handlerDesc,
        });
    });
};
exports.createRequest = createRequest;
var checkParams = function (paramsConfig, params) {
    var keys = Object.keys(paramsConfig);
    for (var i = 0; i < keys.length; i++) {
        var paramKey = keys[i];
        var _a = paramsConfig[paramKey], required = _a.required, type = _a.type, defaultValue = _a.defaultValue, validator = _a.validator;
        if (defaultValue) {
            params[paramKey] = params[paramKey] || defaultValue;
        }
        var paramValue = params[paramKey];
        if (required) {
            if (!params[paramKey])
                return [false, "\u7F3A\u5C11<".concat(paramKey, ">\u53C2\u6570"), status_code_1.StatusCode.LACK_PARAMS];
        }
        if (validator) {
            var result = validator(paramValue);
            if (result[0])
                return result;
            return __spreadArray(__spreadArray([], result, true), [status_code_1.StatusCode.CUSTOM_ERROR], false);
        }
        if (paramValue && typeof paramValue !== type)
            return [false, "\u53C2\u6570<".concat(paramKey, ">\u7C7B\u578B\u9519\u8BEF\uFF0C\u671F\u671B<").concat(type, ">, \u5F97\u5230<").concat(typeof paramValue, ">"), status_code_1.StatusCode.PARAMS_TYPE_ERROR];
    }
    return [true];
};
exports.checkParams = checkParams;
