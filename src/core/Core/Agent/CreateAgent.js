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
exports.CreateAgent = void 0;
const CreateAgentInvocation_1 = require("./CreateAgentInvocation");
const AgentAttribute_1 = require("./AgentAttribute");
const Knowledge_1 = require("../Knowledge");
const AgentInvocation_1 = require("./AgentInvocation");
const OnDemandTypeInfo_1 = require("../Reflection/OnDemandTypeInfo");
const Filters_1 = require("../Helpers/Filters");
const ChainFactory_1 = require("../Compiler/Factory/ChainFactory");
/**
 * Create a new agent from attribute, and add into Agent registry
 *
 * @param target
 * @param strategy
 */
function CreateAgent(target, strategy) {
    // always create new agent using latest annotation
    // 1. get original type if giving type is an agent type
    const origin = Knowledge_1.GetType(target);
    if (origin) {
        // target is an agent already
        // set the target to origin type to recreate this
        // so create another proxy from this origin class
        target = origin;
    }
    if (!target.name) {
        throw new SyntaxError('InvalidConstructor');
    }
    const proxy = strategy || new AgentAttribute_1.AgentAttribute();
    const design = OnDemandTypeInfo_1.OnDemandTypeInfo.find(target);
    let invocation = new AgentInvocation_1.AgentInvocation(design);
    if (design.hasOwnInterceptor()) {
        const interceptors = design.findOwnAttributes(Filters_1.HasInterceptor);
        //.concat(property.value.findOwnAttributes(HasInterceptor));
        invocation = ChainFactory_1.ChainFactory.chainInterceptorAttributes(invocation, interceptors);
    }
    // classic
    // create an invocation for agent type.
    // this chain used to generate agent of this target
    // empty agent
    const chain = CreateAgentInvocation_1.CreateAgentInvocation(invocation, proxy, target);
    // create a new type from this invocation, initialize the agent using reflection info
    /* eslint-disable-next-line prefer-rest-params */
    const agent = chain.invoke([Function, target.name, proxy], target);
    // register new agent map to old type
    // key: Agent proxy, value: origin type
    if (agent !== target) {
        Knowledge_1.RememberType(agent, target);
    }
    return agent;
}
exports.CreateAgent = CreateAgent;
