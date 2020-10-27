"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectAttribute = void 0;
const FindDomainFromInvocation_1 = require("../Helpers/FindDomainFromInvocation");
class InjectAttribute {
    constructor(type) {
        // if (typeof type === 'string') {
        //   // lookup type from local type registration
        //   throw new Error('NotSupportInjectUsingName');
        // } else {
        this.type = type;
        // }
    }
    get interceptor() {
        return this;
    }
    intercept(target, params, receiver) {
        const type = this.type || (target.design && target.design.type);
        if (!type) {
            throw new TypeError('UnknownInjectType');
        }
        // console.log('target:', target.design.declaringType);
        // console.log('receiver:', receiver);
        // console.log('inject:', type);
        // console.log('domain core', Knowledge);
        // console.log('params', params);
        // console.log('receiver', receiver);
        const domain = FindDomainFromInvocation_1.FindDomainFromInvocation(params, receiver);
        if (!domain) {
            throw new Error('NoDomainFoundForInjection');
        }
        return domain.getAgentOrThrow(type);
    }
}
exports.InjectAttribute = InjectAttribute;
