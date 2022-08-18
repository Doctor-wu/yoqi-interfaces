"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.createSchema = void 0;
var mongoose_1 = require("mongoose");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return mongoose_1.Schema; } });
var createSchema = function (config) {
    return new mongoose_1.Schema(config);
};
exports.createSchema = createSchema;
