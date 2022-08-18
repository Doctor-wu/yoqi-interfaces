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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModule = void 0;
var baseModule_1 = require("./baseModule");
var share_1 = require("../../utils/share");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var core_1 = require("../core");
var LogModule = /** @class */ (function (_super) {
    __extends(LogModule, _super);
    function LogModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logQueue = new TaskQueue;
        _this.warnQueue = new TaskQueue;
        _this.errorQueue = new TaskQueue;
        return _this;
    }
    LogModule.prototype.init = function (app) {
        _super.prototype.init.call(this, app);
        app.$logger = this;
        if (app.$config.logger) {
            this.setupLogger();
        }
    };
    LogModule.prototype.setupLogger = function () {
        var path = this.app.$config.logger.path;
        (0, share_1.assertDir)(path);
        this.initIOObserver(path);
    };
    LogModule.prototype.initIOObserver = function (loggerPath) {
        var _this = this;
        var logPath = path_1.default.join(loggerPath, "/log");
        var warnPath = path_1.default.join(loggerPath, "/warn");
        var errorPath = path_1.default.join(loggerPath, "/error");
        (0, share_1.assertDir)(logPath);
        (0, share_1.assertDir)(warnPath);
        (0, share_1.assertDir)(errorPath);
        core_1.io.on("afterLog", function () {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            var now = new Date(Date.now());
            var fileName = "".concat(now.getFullYear(), "-").concat(now.getMonth() + 1, "-").concat(now.getDate(), ".log");
            _this.logQueue.addTask(_this.createTask(path_1.default.join(logPath, fileName), msg));
        });
        core_1.io.on("afterWarn", function () {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            var now = new Date(Date.now());
            var fileName = "".concat(now.getFullYear(), "-").concat(now.getMonth() + 1, "-").concat(now.getDate(), ".log");
            _this.warnQueue.addTask(_this.createTask(path_1.default.join(warnPath, fileName), msg));
        });
        core_1.io.on("afterError", function () {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            var now = new Date(Date.now());
            var fileName = "".concat(now.getFullYear(), "-").concat(now.getMonth() + 1, "-").concat(now.getDate(), ".log");
            _this.errorQueue.addTask(_this.createTask(path_1.default.join(errorPath, fileName), msg));
        });
    };
    LogModule.prototype.createTask = function (filePath, msg) {
        return function () {
            return new Promise(function (resolve) {
                (0, share_1.assertFile)(filePath);
                fs_1.default.appendFile(filePath, msg.join(" ") + "\n", function (error) {
                    if (error)
                        console.error(error);
                    resolve(true);
                });
            });
        };
    };
    return LogModule;
}(baseModule_1.BaseModule));
exports.LogModule = LogModule;
var TaskQueue = /** @class */ (function () {
    function TaskQueue() {
        this.tasks = [];
        this.running = false;
    }
    TaskQueue.prototype.addTask = function (task) {
        this.tasks.push(task);
        if (!this.running)
            this.run();
    };
    TaskQueue.prototype.run = function () {
        var _this = this;
        var task = this.tasks.shift();
        if (!task) {
            this.running = false;
            return;
        }
        this.running = true;
        task.call(null).finally(function () {
            _this.run();
        });
    };
    return TaskQueue;
}());
