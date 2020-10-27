"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyDecoratorAttribute = exports.fakeParameterDecorator = exports.fakeClassPropertyDecorator = exports.fakeClassMethodDecorator = exports.fakeClassDecorator = exports.fakeClassMemberDecorator = void 0;
const lib_1 = require("../../../lib");
function fakeClassMemberDecorator() {
    return lib_1.decorateMember(new PropertyDecoratorAttribute());
}
exports.fakeClassMemberDecorator = fakeClassMemberDecorator;
function fakeClassDecorator() {
    return lib_1.decorateClass(new PropertyDecoratorAttribute());
}
exports.fakeClassDecorator = fakeClassDecorator;
function fakeClassMethodDecorator() {
    return lib_1.decorateMember(new PropertyDecoratorAttribute());
}
exports.fakeClassMethodDecorator = fakeClassMethodDecorator;
function fakeClassPropertyDecorator() {
    return lib_1.decorateMember(new PropertyDecoratorAttribute());
}
exports.fakeClassPropertyDecorator = fakeClassPropertyDecorator;
function fakeParameterDecorator() {
    return lib_1.decorateParameter(new PropertyDecoratorAttribute());
}
exports.fakeParameterDecorator = fakeParameterDecorator;
class PropertyDecoratorAttribute {
    beforeDecorate(target, targetKey, descriptor) {
        return false;
    }
    getInterceptor() {
        throw new TypeError('Fake decorator do not have interceptor');
    }
}
exports.PropertyDecoratorAttribute = PropertyDecoratorAttribute;
