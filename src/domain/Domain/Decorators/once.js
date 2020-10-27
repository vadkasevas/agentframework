"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = void 0;
const core_1 = require("../../../dependencies/core");
const OnceAttribute_1 = require("../Attributes/OnceAttribute");
function once() {
    return core_1.decorateMember(new OnceAttribute_1.OnceAttribute());
}
exports.once = once;
// import { ExtensibleAttribute } from './Attributes/ExtensibleAttribute';
// import { DomainCore } from './Internal/DomainCore';
//
// /**
//  * extensible attribute
//  */
// function OnceDecorator(target: object, propertyKey: string | symbol, descriptor?: any) {
//   console.log('ONCE', propertyKey, descriptor);
// }
//
// export function once(): MethodDecorator | PropertyDecorator {
//   return OnceDecorator;
// }
