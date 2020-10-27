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
exports.AgentInvocation = void 0;
/**
 * Upgrade class to agent
 *
 * @ignore
 * @hidden
 */
class AgentInvocation {
    constructor(design) {
        this.design = design;
    }
    invoke([compiler, name, code, data], receiver) {
        // dont do any change if no changes to the target
        // that means no initializers defined
        if (typeof code !== 'string') {
            return receiver;
        }
        return Reflect.construct(compiler, [name, code + ` { /* [${data}] */ }`])(receiver);
    }
}
exports.AgentInvocation = AgentInvocation;
