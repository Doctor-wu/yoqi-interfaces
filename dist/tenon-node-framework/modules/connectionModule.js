"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionModule = void 0;
var share_1 = require("../../utils/share");
var constant_1 = require("../constant");
var io_1 = require("../core/io");
var bodyparser_1 = require("../middlewares/bodyparser");
var cors_1 = require("../middlewares/cors");
var session_1 = require("../middlewares/session");
var static_1 = require("../middlewares/static");
var baseModule_1 = require("./baseModule");
var ConnectionModule = /** @class */ (function (_super) {
    __extends(ConnectionModule, _super);
    function ConnectionModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectionModule.prototype.init = function (app) {
        _super.prototype.init.call(this, app);
        this.initCors(app);
        this.initBodyParser(app);
        this.initSession(app);
        this.initStatic(app);
        app.$connection = this;
    };
    ConnectionModule.prototype.initBodyParser = function (app) {
        app.use((0, bodyparser_1.bodyParser)(app.$config.bodyParser));
    };
    ConnectionModule.prototype.initSession = function (app) {
        var $config = app.$config;
        var _a = $config.session, session = _a === void 0 ? {} : _a;
        var SESS_CONF = Object.assign({}, constant_1.CONSTANT.defaultSessionConfig, session);
        try {
            (0, session_1.setupSession)(app, SESS_CONF);
            (0, share_1.compose)(io_1.io.moduleStyle, io_1.io.log)("Session initd");
        }
        catch (err) {
            io_1.io.error("加载session失败", err);
        }
    };
    ConnectionModule.prototype.initStatic = function (app) {
        if (app.$config.static) {
            (0, static_1.setupStatic)(app, app.$config.static);
        }
    };
    ConnectionModule.prototype.initCors = function (app) {
        (0, cors_1.setupCors)(app);
    };
    return ConnectionModule;
}(baseModule_1.BaseModule));
exports.ConnectionModule = ConnectionModule;
