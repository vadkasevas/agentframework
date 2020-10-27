"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomInterceptor = void 0;
class RandomInterceptor {
    beforeDecorate(target, targetKey, descriptor) {
        return true;
    }
    get interceptor() {
        return this;
    }
    intercept(target, params, receiver) {
        const a = target.invoke(params, receiver);
        expect(a).toBeUndefined();
        return Date.now() + 0.23133;
    }
}
exports.RandomInterceptor = RandomInterceptor;
