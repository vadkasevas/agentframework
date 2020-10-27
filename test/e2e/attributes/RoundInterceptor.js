"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundInterceptor = void 0;
class RoundInterceptor {
    beforeDecorate(target, targetKey, descriptor) {
        return true;
    }
    intercept(target, parameters, receiver) {
        // interceptor is working on method, it should be a function target
        const num = target.invoke(parameters, receiver);
        if ('number' !== typeof num) {
            return 0;
        }
        return Math.round(num);
    }
    get interceptor() {
        return this;
    }
}
exports.RoundInterceptor = RoundInterceptor;
