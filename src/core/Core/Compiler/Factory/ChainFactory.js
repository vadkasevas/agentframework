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
exports.ChainFactory = void 0;
// import { InitializerInvocation } from '../Invocation/InitializerInvocation';
const InterceptorInvocation_1 = require("../Invocation/InterceptorInvocation");
/**
 *
 */
class ChainFactory {
    // /**
    //  * @ignore
    //  * @hidden
    //  */
    // static chainInitializerAttributes(origin: IInvocation, attributes: Array<IInitializerAttribute>): IInvocation {
    //   // make invocation chain of interceptors
    //   for (const attribute of attributes) {
    //     const initializer = attribute.initializer;
    //     // skip if initializer return false
    //     if (initializer && 'function' === typeof initializer.initialize) {
    //       origin = new InitializerInvocation(origin, initializer);
    //     }
    //   }
    //   return origin;
    // }
    /**
     * @ignore
     * @hidden
     */
    static chainInterceptorAttributes(origin, interceptors) {
        // make invocation chain of interceptors
        if (interceptors.length) {
            for (const attribute of interceptors) {
                const interceptor = attribute.interceptor;
                if (interceptor && 'function' === typeof interceptor.intercept) {
                    origin = new InterceptorInvocation_1.InterceptorInvocation(origin, interceptor);
                }
            }
        }
        return origin;
    }
}
exports.ChainFactory = ChainFactory;
