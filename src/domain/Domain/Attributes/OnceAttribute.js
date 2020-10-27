"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnceAttribute = void 0;
class OnceAttribute {
    get interceptor() {
        return this;
    }
    intercept(target, params, receiver) {
        const value = target.invoke(params, receiver);
        const descriptor = target.design.descriptor;
        if (descriptor && descriptor.get && !descriptor.set) {
            Reflect.defineProperty(receiver, target.design.key, {
                get() {
                    return value;
                },
                enumerable: true,
                configurable: true,
            });
        }
        else {
            throw new Error('OnceOnlyAvailableOnGetter');
        }
        return value;
    }
}
exports.OnceAttribute = OnceAttribute;
