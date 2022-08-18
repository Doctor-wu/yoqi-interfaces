"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANT = void 0;
exports.CONSTANT = {
    defaultServerName: "tenon-server",
    defaultServerAddress: "mongodb://localhost:27017/tenon",
    defaultSessionConfig: {
        key: 'dtwu:ssid',
        maxAge: 86400 * 1000,
        httponly: true,
        signed: true,
        renew: true,
        /** cookie快过期时自动重新设置*/
        sameSite: 'strict',
    },
    defaultCorsConfig: {
        credentials: true,
    }
};
