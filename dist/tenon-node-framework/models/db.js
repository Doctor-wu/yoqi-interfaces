"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.establishDBConnection = void 0;
var io_1 = require("../core/io");
var mongoose_1 = __importDefault(require("mongoose"));
var constant_1 = require("../constant");
var establishDBConnection = function (config) {
    return new Promise(function (resolve, reject) {
        if (!config.mongodb)
            return reject('lack mongodb config');
        var DB_ADDRESS = constant_1.CONSTANT.defaultServerAddress;
        mongoose_1.default.connect(config.mongodb.address || DB_ADDRESS, {
            user: config.mongodb.username,
            pass: config.mongodb.password,
        }, function (err) {
            if (err) {
                io_1.io.error(JSON.stringify({ msg: '[Mongoose] database connect failed!', err: err }));
                reject(err);
            }
            else {
                io_1.io.log(io_1.io.bold.white.bgHex('#494')('[Mongoose] database connect success!'));
                resolve(mongoose_1.default);
            }
        });
    });
};
exports.establishDBConnection = establishDBConnection;
