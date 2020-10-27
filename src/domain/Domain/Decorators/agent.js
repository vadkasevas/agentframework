"use strict";
/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.agent = void 0;
// /**
//  * Convert a type to agent
//  */
// export function Agent<T extends object>(target: Constructor<T>): Constructor<T> {
//   // the attributes to initialize agent constructor
//   // current only support only one initializer, multiple interceptors
//   // make sure one attribute for one target
//   return CreateAgent(target);
// }
const core_1 = require("../../../dependencies/core");
const CreateDomainAgent_1 = require("../Factory/CreateDomainAgent");
const DomainKnowledge_1 = require("../DomainKnowledge");
const InMemoryDomain_1 = require("../InMemoryDomain");
/**
 * Define an agent
 */
function agent() {
    // return decorateAgent(new DomainAgentAttribute());
    // return decorateAgent(new DomainAgentAttribute(), [new ClassInitializerAttribute()]);
    return (target) => {
        const domain = DomainKnowledge_1.DomainKnowledge.GetLocalDomain(InMemoryDomain_1.InMemoryDomain);
        // register this agent after create new instance
        core_1.Reflector(target).addAttribute({
            interceptor: {
                intercept(target, params, receiver) {
                    const agent = target.invoke(params, receiver);
                    domain.addAgent(receiver, agent);
                    return agent;
                },
            },
        });
        return DomainKnowledge_1.DomainKnowledge.GetDomainAgent(domain, target) || CreateDomainAgent_1.CreateDomainAgent(domain, target);
    };
}
exports.agent = agent;
