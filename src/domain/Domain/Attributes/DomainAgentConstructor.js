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
exports.OnDemandClassConstructor = void 0;
const core_1 = require("../../../dependencies/core");
const InitializableAttribute_1 = require("./InitializableAttribute");
/**
 * introduce agent fields and properties during 1st access
 */
class OnDemandClassConstructor {
    /**
     * ES6 Proxy Constructor hook
     */
    construct(target, params, newTarget) {
        const origin = {
            invoke(params, receiver) {
                return Reflect.construct(target, params, receiver);
            },
        };
        Reflect.defineProperty(origin, 'design', {
            get() {
                return core_1.Reflector(target);
            },
        });
        const attribute = new InitializableAttribute_1.InitializableAttribute();
        return attribute.intercept(origin, params, newTarget);
    }
}
exports.OnDemandClassConstructor = OnDemandClassConstructor;
