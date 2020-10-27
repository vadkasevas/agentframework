"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDomainAgent = void 0;
const core_1 = require("../../../dependencies/core");
const DomainAgentAttribute_1 = require("../Attributes/DomainAgentAttribute");
const DomainKnowledge_1 = require("../DomainKnowledge");
function CreateDomainAgent(domain, type) {
    // check owner domain
    const owner = DomainKnowledge_1.DomainKnowledge.GetDomain(type);
    if (owner && domain !== owner) {
        throw new TypeError('NotSupportCreateAgentForOtherDomain');
    }
    // 1. get original type if giving type is an agent type
    // const origin = Knowledge.GetType(type);
    // if (origin) {
    //   // target is an agent already
    //   // set the target to origin type to recreate this
    //   // so create another proxy from this origin class
    //   console.log('exists domain type', type);
    //   type = origin;
    // }
    // if (typeof domain.constructor.name === 'function') {
    //   debugger;
    //   console.log('<< CREATE >>', domain.constructor.name, '====>', type.name);
    // }
    // upgrade to Agent only if interceptor or initializer found
    const domainAgent = core_1.CreateAgent(type, new DomainAgentAttribute_1.DomainAgentAttribute(domain));
    // console.log('found', domain, type, newType)
    // const name = Reflector(type).name;
    // const factory = Function(name, [`return`, `class`, `${name}$`, `extends`, name, '{}'].join(' '));
    // const newType = factory(type);
    // Knowledge.RememberType(domainAgent, type);
    DomainKnowledge_1.DomainKnowledge.RememberDomainAgent(domain, type, domainAgent);
    // console.log('create', newType.name, ' for domain', domain.name);
    return domainAgent;
}
exports.CreateDomainAgent = CreateDomainAgent;
