"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouter = void 0;
function useRouter(target, propertyKey, descriptor) {
    var cb = descriptor.value;
    target.handlers = target.handlers || [];
    target.handlers.push(function (instance) {
        var app = instance.app;
        var $router = app.$router;
        var router = $router.router;
        router.use(cb);
    });
}
exports.useRouter = useRouter;
