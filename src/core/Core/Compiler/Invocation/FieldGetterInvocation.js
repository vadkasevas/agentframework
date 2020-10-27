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
exports.FieldGetterInvocation = void 0;
/**
 * @ignore
 * @hidden
 */
class FieldGetterInvocation {
    constructor(design) {
        this.design = design;
    }
    invoke(params, receiver) {
        // how to know the value of a field before you create that class
        // return the value from prototype is a good choose? NO, it may cause infinite loops
        return params[0];
    }
}
exports.FieldGetterInvocation = FieldGetterInvocation;
