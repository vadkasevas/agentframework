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

import { Constructor } from '../Compiler/Constructor';

const GetWeakMap = new Function('k', 'return k=Symbol.for(k),this[k]||(this[k]=new WeakMap())');

export const Agents: WeakMap<any, any> = GetWeakMap('AgentFramework.Agents');
export const Types: WeakMap<any, any> = GetWeakMap('AgentFramework.Types');

export function IsAgent<T>(agent: Constructor<T>): boolean {
  return Agents.has(agent);
}

export function GetType<T>(agent: Constructor<T>): Constructor<T> | undefined {
  return Agents.get(agent);
}
