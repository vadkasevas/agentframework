"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonAttribute = void 0;
const FindDomainFromInvocation_1 = require("../Helpers/FindDomainFromInvocation");
class SingletonAttribute {
    constructor(type) {
        this.type = type;
    }
    get interceptor() {
        return this;
    }
    intercept(target, params, receiver) {
        const customType = this.type;
        const designType = target.design && target.design.type;
        const type = customType || designType;
        if (!type) {
            throw new TypeError('UnknownSingletonType');
        }
        // if (target.design instanceof ParameterInfo) {
        //   console.log('parameter info', parameters);
        // } else {
        //   console.log('property info', parameters);
        // }
        // console.log('inject parameter', parameters);
        // console.log('inject type', type.name);
        // const dom = DomainCore.GetDomain(receiver);
        // console.log('inject domain', typeof dom);
        // if (!dom) {
        //   console.log('inject receiver', typeof receiver, receiver);
        // }
        // console.log('is same', target.design.declaringType === target.target);
        // if (target.design.declaringType !== target.target) {
        //   console.log('target', target.target.name);
        //   console.log('design target', target.design.name,  target.design.declaringType.name);
        // }
        // if this object created by domain, the last argument is domain itself
        // console.log('find domain for type', receiver)
        const domain = FindDomainFromInvocation_1.FindDomainFromInvocation(params, receiver);
        if (!domain) {
            throw new TypeError('NoDomainFoundForSingletonInjection');
        }
        // console.log('find singleton', type.name, 'from', domain.name);
        return ((customType && domain.getAgent(customType)) ||
            (designType && domain.getAgent(designType)) ||
            domain.construct(type, params)
        // domain.construct(type) // do not include the parameters
        );
        //
        // console.log('found', found);
        //
        // return found;
    }
}
exports.SingletonAttribute = SingletonAttribute;
