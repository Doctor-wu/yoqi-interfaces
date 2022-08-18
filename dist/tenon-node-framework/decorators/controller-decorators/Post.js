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
exports.Post = void 0;
var helper_1 = require("./helper");
var utils_1 = require("./utils");
var registry_1 = require("../../controller/registry");
function Post(requestPath, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    var _a = requestOptions.params, paramsConfig = _a === void 0 ? {} : _a;
    return function postDecorator(target, propertyKey, descriptor) {
        var originCb = descriptor.value;
        var newCb = function (ctx, next) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var request, params, _b, success, errorMsg, errorCode, store, middleware, _c, access, reason;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            request = ctx.request;
                            params = Object.assign({}, request.body || {}, request.params || {});
                            _b = (0, helper_1.checkParams)(paramsConfig, params), success = _b[0], errorMsg = _b[1], errorCode = _b[2];
                            if (!!success) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.responseError(ctx, next)(errorCode, errorMsg)];
                        case 1: return [2 /*return*/, _d.sent()];
                        case 2:
                            store = (0, registry_1.getControllerStore)(this.ControllerName);
                            middleware = this.middleware.concat();
                            middleware.push.apply(middleware, (((_a = store.middleware) === null || _a === void 0 ? void 0 : _a[propertyKey]) || []));
                            return [4 /*yield*/, (0, utils_1.processMiddleWare)(middleware, ctx, params)];
                        case 3:
                            _c = _d.sent(), access = _c[0], reason = _c[1];
                            if (access === false)
                                return [2 /*return*/, this.responseError(ctx, next)(1111, reason)];
                            /** 处理中间件 */
                            return [4 /*yield*/, originCb.call(this, ctx, next, params)];
                        case 4:
                            /** 处理中间件 */
                            _d.sent(); // 调用源函数
                            return [2 /*return*/];
                    }
                });
            });
        };
        (0, helper_1.createRequest)(target, newCb, {
            requestPath: requestPath,
            requestMethod: "post",
            handlerDesc: "".concat(target.constructor.name, ".").concat(propertyKey),
        });
    };
}
exports.Post = Post;
