"use strict";
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
exports.Subscribe = void 0;
var Subscribe = /** @class */ (function () {
    function Subscribe() {
        this.events = {};
    }
    Subscribe.prototype.on = function (eventName, handler) {
        if (!this.events[eventName])
            this.events[eventName] = [];
        this.events[eventName].push(handler);
    };
    Subscribe.prototype.once = function (eventName, handler) {
        var _this = this;
        if (!this.events[eventName])
            this.events[eventName] = [];
        var handlerAgent = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.cancel(eventName, handlerAgent);
            handler.call.apply(handler, __spreadArray([null], args, false));
        };
        this.events[eventName].push(handlerAgent);
    };
    Subscribe.prototype.cancel = function (eventName, cancelHandler) {
        var idx = this.events[eventName].findIndex(function (handler) { return cancelHandler === handler; });
        if (idx === -1)
            return;
        this.events[eventName][idx] = null;
    };
    Subscribe.prototype.emit = function (eventName) {
        var payloads = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            payloads[_i - 1] = arguments[_i];
        }
        if (!this.events[eventName])
            return;
        this.events[eventName].forEach(function (handler) {
            if (handler === null)
                return;
            handler.apply(null, payloads);
        });
    };
    return Subscribe;
}());
exports.Subscribe = Subscribe;
