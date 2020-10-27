"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDomain = void 0;
const DomainKnowledge_1 = require("../DomainKnowledge");
/**
 * `true` if target object is a domain
 *
 * @param target
 */
function IsDomain(target) {
    return target && DomainKnowledge_1.DomainKnowledge.GetDomain(target) === target;
}
exports.IsDomain = IsDomain;
