"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorJson = exports.createResponseJson = void 0;
var status_code_1 = require("./status-code");
var createResponseJson = function (data) {
    return {
        code: status_code_1.StatusCode.SUCCESS,
        success: true,
        successText: status_code_1.CodeText[status_code_1.StatusCode.SUCCESS],
        data: data,
    };
};
exports.createResponseJson = createResponseJson;
var createErrorJson = function (errorCode, errorMsg) {
    return {
        code: errorCode,
        success: false,
        errorMsg: errorMsg,
    };
};
exports.createErrorJson = createErrorJson;
