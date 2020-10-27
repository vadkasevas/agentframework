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
exports.InterceptorInvocation = void 0;
/**
 * invocation wrapper for interceptor
 *
 * @ignore
 * @hidden
 */
class InterceptorInvocation {
    constructor(_next, _interceptor) {
        this._next = _next;
        this._interceptor = _interceptor;
    }
    get design() {
        return this._next.design;
    }
    invoke(params, receiver) {
        return this._interceptor.intercept(this._next, params, receiver);
    }
}
exports.InterceptorInvocation = InterceptorInvocation;
