"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectAttribute = void 0;
const lib_1 = require("../../../lib");
class InjectAttribute {
    get interceptor() {
        return this;
    }
    intercept(target, parameters, receiver) {
        if (target.design.kind == lib_1.MemberKinds.Property && typeof parameters[0] !== 'undefined') {
            return target.invoke(parameters, receiver);
        }
        if (target.design.type) {
            return Reflect.construct(target.design.type, parameters);
        }
        throw new Error('Unknown type to inject');
    }
}
exports.InjectAttribute = InjectAttribute;
