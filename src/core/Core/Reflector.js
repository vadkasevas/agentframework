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
exports.Reflector = void 0;
const OnDemandTypeInfo_1 = require("./Reflection/OnDemandTypeInfo");
const NotImplementedError_1 = require("./Error/NotImplementedError");
const NotSupportedError_1 = require("./Error/NotSupportedError");
/**
 * Reflector is the interface to access type data from class constructor or class prototype
 *
 * Access class member annotations
 *
 * Reflector(UserClass).property('main');               // for class member
 * Reflector(UserClass).prototype.property('main');     // for class member
 * Reflector(UserClass).static.property('main');        // for static member
 *
 * Access class static member annotations
 *
 * Reflector(UserClass.prototype).property('main');   // for class member
 * Reflector(UserClass).property('main');             // for static member
 */
function Reflector(target) {
    if (typeof target === 'function') {
        // make sure get the prototype of origin type
        return OnDemandTypeInfo_1.OnDemandTypeInfo.find(target.prototype);
    }
    else if (target == null) {
        throw new NotSupportedError_1.NotSupportedError(`Reflector(null)`);
    }
    else if (typeof target === 'object') {
        // if a object hasOwnPropertyDescriptor('constructor') then this object is a prototype
        // instance don't have own constructor property
        if (Reflect.getOwnPropertyDescriptor(target, 'constructor')) {
            return OnDemandTypeInfo_1.OnDemandTypeInfo.find(target);
        }
        else {
            // object without own property constructor consider an instance
            throw new NotImplementedError_1.NotImplementedError(`Reflector(${target.constructor.name} {})`);
        }
    }
    else {
        // number, boolean, string and so on
        throw new NotSupportedError_1.NotSupportedError(`Reflector(${typeof target})`);
    }
}
exports.Reflector = Reflector;
