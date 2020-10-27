"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domain = void 0;
const DomainKnowledge_1 = require("./DomainKnowledge");
/**
 * Domain is a container of types and agents
 */
class Domain {
    /**
     * Construct a new instance
     */
    static construct(target, params) {
        return Reflect.construct(target, params);
    }
    constructor() {
        DomainKnowledge_1.DomainKnowledge.RememberDomain(this, this);
    }
    /**
     * Domain name
     */
    get name() {
        return this.constructor.name;
    }
}
exports.Domain = Domain;
