"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindInitializers = void 0;
const DomainKnowledge_1 = require("../DomainKnowledge");
const Symbols_1 = require("../Symbols");
function FindInitializers(target) {
    // console.log('FI', target, typeof target);
    const ctor = DomainKnowledge_1.DomainKnowledge.GetInitializers(target);
    if (ctor) {
        // console.log('HIT cache =================', target, ctor);
        return ctor;
    }
    // const map = new Map<Function, Function>();
    const found = [];
    let prototype = target.prototype;
    while (prototype && prototype.constructor !== Object) {
        const descriptor = Reflect.getOwnPropertyDescriptor(prototype, Symbols_1.Initializer);
        if (descriptor && typeof descriptor.value == 'function') {
            found.unshift([descriptor.value, prototype.constructor]);
            // map.set(descriptor.value, prototype.constructor);
        }
        prototype = Reflect.getPrototypeOf(prototype);
    }
    // console.log('find', target, found);
    // console.log('map', target.name, map);
    // make cache for next calls
    if (found.length) {
        const cache = new Array();
        for (const layer of found) {
            const type = layer[1];
            cache.push(layer);
            if (!DomainKnowledge_1.DomainKnowledge.HasInitializer(type)) {
                DomainKnowledge_1.DomainKnowledge.SetInitializers(type, cache.slice());
            }
        }
    }
    DomainKnowledge_1.DomainKnowledge.SetInitializers(target, found);
    // console.log('*********', target.name, '==>', found);
    return found;
    // const fin = [];
    // for (const ctor of ctors) {
    //   // const name = ctor.name;
    //   fin.unshift(ctor);
    // }
    //
    // console.log('find', target, '====>', fin);
    //
    // return fin;
}
exports.FindInitializers = FindInitializers;
