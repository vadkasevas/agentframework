"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensible = void 0;
const DomainKnowledge_1 = require("../DomainKnowledge");
/**
 * extensible attribute
 */
function ExtensibleDecorator(target) {
    const uuid = `class://${target.name}`;
    const type = DomainKnowledge_1.DomainKnowledge.GetExtensible(uuid);
    if (!type) {
        DomainKnowledge_1.DomainKnowledge.SetExtensible(uuid, target);
        // Reflector(target).addAttribute(new ExtensibleAttribute());
        return target;
    }
    return type;
}
function extensible() {
    return ExtensibleDecorator;
}
exports.extensible = extensible;
