"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindDomain = void 0;
const DomainKnowledge_1 = require("../DomainKnowledge");
function FindDomain(target) {
    let prototype = target.prototype;
    while (prototype) {
        const domain = DomainKnowledge_1.DomainKnowledge.GetDomain(prototype.constructor);
        if (domain) {
            // console.log('FOUND');
            return domain;
        }
        // console.log('NOT FOUND!!!');
        prototype = Reflect.getPrototypeOf(prototype);
    }
    return;
}
exports.FindDomain = FindDomain;
