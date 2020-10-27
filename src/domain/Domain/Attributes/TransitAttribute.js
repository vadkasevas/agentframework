"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitAttribute = void 0;
const FindDomainFromInvocation_1 = require("../Helpers/FindDomainFromInvocation");
const Domain_1 = require("../Domain");
class TransitAttribute {
    constructor(type) {
        this.type = type;
    }
    get interceptor() {
        return this;
    }
    intercept(target, params, receiver) {
        const type = this.type || (target.design && target.design.type);
        if (!type) {
            throw new TypeError('UnknownTransitType');
        }
        // if this object created by domain, the last argument is domain itself
        const domain = FindDomainFromInvocation_1.FindDomainFromInvocation(params, receiver);
        if (domain) {
            // console.log('get type', typeof receiver, type.name)
            return domain.construct(type, params, true);
        }
        else {
            return Domain_1.Domain.construct(type, params);
        }
    }
}
exports.TransitAttribute = TransitAttribute;
