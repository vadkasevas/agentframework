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

import { Invocation } from '../Interfaces/Invocation';
import { InterceptorInvocation } from '../Compiler/Invocation/InterceptorInvocation';
import { ClassAttribute } from '../Interfaces/TypeAttributes';
import { CanDecorate } from '../Decorator/CanDecorate';

/**
 * Build Agent using AgentAttribute
 */
export function CreateAgentInvocation(invocation: Invocation, attribute: ClassAttribute, target: Function): Invocation {
  // chain the pipeline
  // custom interceptors -> agent interceptor -> agent initializer -> agent invocation
  let chain: Invocation = invocation;

  // // add single initializer into pipeline (mandatory)
  // const initializer = attribute.interceptor;
  // if (initializer && 'function' === typeof initializer.intercept) {
  //   invocation = new InitializerInvocation(invocation, initializer);
  // } else {
  //   throw new Error('InvalidAgentAttribute');
  // }

  // add single interceptor into pipeline (optional)
  if (CanDecorate(attribute, target)) {
    const interceptor = attribute.interceptor;
    if (interceptor && 'function' === typeof interceptor.intercept) {
      chain = new InterceptorInvocation(chain, interceptor);
    }
  }

  return chain;
}
