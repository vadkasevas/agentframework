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
exports.decorateAgent = void 0;
// import { Reflector } from '../Reflector';
const CanDecorate_1 = require("./CanDecorate");
const AddAttribute_1 = require("../Annotation/AddAttribute");
/**
 * Decorate class with attribute
 */
function decorateAgent(attribute) {
    // upgrade prototype
    return (target) => {
        if (CanDecorate_1.CanDecorate(attribute, target)) {
            AddAttribute_1.AddAttributeToClass(attribute, target);
        }
    };
}
exports.decorateAgent = decorateAgent;
