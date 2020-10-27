"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindExtendedClass = void 0;
function FindExtendedClass(target, receiver) {
    // console.log('\n');
    // console.log('target', target, '=====>', receiver);
    let prototype = receiver.prototype;
    const extend = [];
    while (prototype && prototype.constructor !== target) {
        extend.unshift(prototype.constructor);
        prototype = Reflect.getPrototypeOf(prototype);
    }
    return extend;
}
exports.FindExtendedClass = FindExtendedClass;
