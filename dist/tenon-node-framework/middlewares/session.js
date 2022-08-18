"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSession = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var koa_session_1 = __importDefault(require("koa-session"));
var io_1 = require("../core/io");
var share_1 = require("../../utils/share");
var setupSession = function (app, config) {
    try {
        var secret = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../utils/secret.json"));
        (0, share_1.compose)(io_1.io.successStyle, io_1.io.bold, io_1.io.log)("读取密钥成功");
        app.keys = JSON.parse(secret.toString());
        app.use((0, koa_session_1.default)(config, app));
    }
    catch (err) {
        io_1.io.error("加载session失败", err);
    }
};
exports.setupSession = setupSession;
