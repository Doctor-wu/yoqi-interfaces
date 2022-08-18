"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeText = exports.StatusCode = void 0;
exports.StatusCode = {
    SUCCESS: 200,
    LACK_PARAMS: 1001,
    PARAMS_TYPE_ERROR: 1002,
    CUSTOM_ERROR: 1003,
    BUSINESS_ERROR: 1111,
};
exports.CodeText = (_a = {},
    _a[exports.StatusCode.SUCCESS] = "成功",
    _a[exports.StatusCode.LACK_PARAMS] = "缺少参数",
    _a[exports.StatusCode.PARAMS_TYPE_ERROR] = "参数类型错误",
    _a[exports.StatusCode.CUSTOM_ERROR] = "自定义错误",
    _a[exports.StatusCode.BUSINESS_ERROR] = "业务错误",
    _a);
