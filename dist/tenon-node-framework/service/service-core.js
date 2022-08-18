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
exports.BaseService = exports.initServices = void 0;
var share_1 = require("../../utils/share");
var io_1 = require("../core/io");
var initServices = function (app) {
    var services = app.$config.services;
    if (!services)
        return;
    app.$services = {};
    services.forEach(function (ServiceCtor) {
        var instance = new ServiceCtor(app);
        app.$services[instance.serviceName] = instance;
        io_1.io.log("- ".concat(instance.serviceName));
    });
    (0, share_1.compose)(io_1.io.moduleStyle, io_1.io.log)('Service initd');
};
exports.initServices = initServices;
var BaseService = /** @class */ (function () {
    function BaseService(app) {
        this.app = app;
    }
    /** 初始化Model */
    BaseService.prototype.buildModel = function () {
        this.model = this.app.$mongoose.model(this.serviceName, this.schemaInstance);
    };
    /** 创建一个Model实例 */
    BaseService.prototype.createModelInstance = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new ((_a = this.Model).bind.apply(_a, __spreadArray([void 0], args, false)))();
    };
    /**
     * 向数据库中存入一条对应Model的实体数据
     * @param itemInfo Model中一条数据
     * @returns
     */
    BaseService.prototype.addItem = function (itemInfo) {
        var entity = new this.Model(itemInfo);
        return new Promise(function (resolve, reject) {
            entity.validate(function (err) {
                if (err)
                    reject(err);
                resolve(entity);
            });
        }).then(function () {
            return new Promise(function (resolve, reject) {
                entity.save(function (err, result) {
                    if (err)
                        reject(err);
                    resolve(result);
                });
            });
        });
    };
    BaseService.prototype.deleteItemById = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Model.deleteOne({ _id: _id })];
                    case 1:
                        result = _a.sent();
                        if (result.deletedCount === 0)
                            throw new Error('删除失败');
                        else
                            return [2 /*return*/, '删除成功'];
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseService.prototype.deleteManyByIds = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Model.deleteMany({ _id: { $in: ids } })];
                    case 1:
                        result = _a.sent();
                        if (result.deletedCount === ids.length)
                            return [2 /*return*/, '删除成功'];
                        throw new Error('删除失败');
                }
            });
        });
    };
    BaseService.prototype.updateItemById = function (_id, info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateItemByQuery({ _id: _id }, info)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BaseService.prototype.updateItemByQuery = function (query, info) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.updateOne(query, info)];
                    case 1:
                        result = _a.sent();
                        if (!result.matchedCount)
                            throw "\u66F4\u65B0\u5185\u5BB9\u4E0D\u5B58\u5728";
                        if (!result.modifiedCount)
                            throw '更新失败';
                        return [2 /*return*/, '更新成功'];
                }
            });
        });
    };
    BaseService.prototype.errorProtectedHandler = function (resultGetter) {
        return __awaiter(this, void 0, void 0, function () {
            var err, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, resultGetter()];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        err = e_1;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, [err, result]];
                }
            });
        });
    };
    Object.defineProperty(BaseService.prototype, "Model", {
        get: function () {
            return this.model;
        },
        enumerable: false,
        configurable: true
    });
    return BaseService;
}());
exports.BaseService = BaseService;
