"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodDecorator = void 0;
const lib_1 = require("../../../lib");
function methodDecorator() {
    return lib_1.decorateMember(new MethodDecoratorAttribute());
}
exports.methodDecorator = methodDecorator;
class MethodDecoratorAttribute {
    beforeDecorate(target, targetKey, descriptor) {
        return true;
    }
    getInterceptor() {
        return this;
    }
    intercept(invocation, parameters, receiver) {
        return invocation.invoke(parameters, receiver);
    }
}
