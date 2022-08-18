"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var uuid = require('uuid');
var path_1 = __importDefault(require("path"));
var secretPool = [];
for (var i = 0; i < 1024; i++) {
    secretPool.push(uuid.v4().replace(/-/g, ""));
}
fs.writeFile(path_1.default.resolve(__dirname, './secret.json'), JSON.stringify(secretPool), function (err, data) {
    if (err) {
        console.error('生成密钥失败：', err);
        return;
    }
    console.log("密钥已更新");
});
