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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
var chalk_1 = __importDefault(require("chalk"));
var share_1 = require("../../utils/share");
var Subscribe_1 = require("../../utils/Subscribe");
var errorStyle = chalk_1.default.bold.red;
var warnStyle = chalk_1.default.hex('#FFA500');
var logStyle = chalk_1.default.hex('#cacaca');
var successStyle = chalk_1.default.hex('#33bb33');
var BaseIO = /** @class */ (function (_super) {
    __extends(BaseIO, _super);
    function BaseIO() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.noEmit = false;
        _this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.noEmit)
                return;
            var msg = __spreadArray([(0, share_1.compose)(_this.logStyle, _this.bold)('[Log]', new Date().toLocaleString())], args, true);
            console.log.apply(console, msg);
            _this.emit.apply(_this, __spreadArray(["afterLog", '[Log]', new Date().toLocaleString()], args.map(_this.reset), false));
        };
        _this.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.noEmit)
                return;
            var msg = __spreadArray([(0, share_1.compose)(_this.errorStyle, _this.bold)('[Error]'), new Date().toLocaleString()], args, true);
            console.log.apply(console, msg);
            _this.emit.apply(_this, __spreadArray(["afterError", '[Error]', new Date().toLocaleString()], args.map(_this.reset), false));
        };
        _this.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.noEmit)
                return;
            var msg = __spreadArray([(0, share_1.compose)(_this.warnStyle, _this.bold)('[Warn]'), new Date().toLocaleString()], args, true);
            console.log.apply(console, msg);
            _this.emit.apply(_this, __spreadArray(["afterWarn", '[Warn]', new Date().toLocaleString()], args.map(_this.reset), false));
        };
        _this.logStyle = logStyle;
        _this.warnStyle = warnStyle;
        _this.errorStyle = errorStyle;
        _this.successStyle = successStyle;
        _this.bold = chalk_1.default.bold;
        _this.moduleStyle = _this.bold.hex("#39f");
        _this.hex = chalk_1.default.hex;
        _this.chalk = chalk_1.default;
        return _this;
    }
    BaseIO.prototype.reset = function (msg) {
        if (!(typeof msg === "string")) {
            msg = msg.toString();
        }
        return msg.replace(ansiRegex(), '');
    };
    return BaseIO;
}(Subscribe_1.Subscribe));
function ansiRegex(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.onlyFirst, onlyFirst = _c === void 0 ? false : _c;
    var pattern = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
    ].join('|');
    return new RegExp(pattern, onlyFirst ? undefined : 'g');
}
exports.io = new BaseIO;
