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
exports.decorateMember = void 0;
const CanDecorate_1 = require("./CanDecorate");
const AddAttribute_1 = require("../Annotation/AddAttribute");
/**
 * Decorate class properties (field, getter, setter and methods)
 */
function decorateMember(attribute) {
    return (target, targetKey, descriptor) => {
        // if (typeof target === 'function') {
        //   throw new Error('Attribute not allow declare on class static member');
        // }
        if (CanDecorate_1.CanDecorate(attribute, target, targetKey, descriptor)) {
            AddAttribute_1.AddAttributeToMember(attribute, target, targetKey, descriptor);
            // Reflector(target)
            //   .property(propertyKey, descriptor)
            //   .addAttribute(attribute);
        }
    };
}
exports.decorateMember = decorateMember;
