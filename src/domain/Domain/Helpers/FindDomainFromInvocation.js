"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindDomainFromInvocation = void 0;
const IsDomain_1 = require("./IsDomain");
const FindDomain_1 = require("./FindDomain");
const DomainKnowledge_1 = require("../DomainKnowledge");
/**
 * Find domain from invocation or parameters
 *
 * DomainReference don't have construct or resolve, so it will never create new instance
 */
function FindDomainFromInvocation(params, receiver) {
    // console.log('find domain', typeof receiver, receiver, 'params', params);
    if (typeof receiver === 'function') {
        // console.log('find', receiver);
        // check: receiver is domain scope type
        const found = FindDomain_1.FindDomain(receiver);
        if (found) {
            // console.log('🍎 🍎 🍎 🍎 🍎 receiver type registered by a Domain', receiver);
            return found;
        }
    }
    else if (typeof receiver === 'object' && receiver != null) {
        // check: receiver is a domain
        const domain = DomainKnowledge_1.DomainKnowledge.GetDomain(receiver);
        if (domain) {
            // console.log('👏 👏 👏 👏  receiver is a Domain', receiver.constructor.name);
            return domain;
        }
        // console.log('find', receiver, domain);
        // check: receiver is an object (search the prototype chain)
        const found = FindDomain_1.FindDomain(receiver.constructor);
        if (found) {
            return found;
        }
    }
    // 4. if there have a domain instance in the parameter
    for (let idx = 0; idx < params.length; idx++) {
        const parameter = params[idx];
        if (IsDomain_1.IsDomain(parameter)) {
            return parameter;
        }
    }
    return;
}
exports.FindDomainFromInvocation = FindDomainFromInvocation;
