import { Reflection } from './core/reflection';
import { IDomain } from './domain';
import { IAttribute } from './core/attribute';
import { AgentCompileType, AgentOptions, decorateAgent } from './core/decorator';
import { IsString } from './core/utils';

// ===========================================
// ES2015 or before
// ===========================================
/* istanbul ignore if  */
if (typeof Reflect !== 'object' || typeof Proxy !== 'function') {
  throw new Error('Agent Framework requires ES2016 support');
}

// ===========================================
// ES2016
// ===========================================
if (typeof Reflect['metadata'] !== 'function') {
  // Install Reflect.metadata for tsc only
  // tsc will add following code to the generated js file. in order to utilize these information.
  // we create and method of Reflect.metadata to inject these information to Reflection object
  //     Reflect.metadata("design:type", Function),
  //     Reflect.metadata("design:paramtypes", []),
  //     Reflect.metadata("design:returntype", String)
  Reflect['metadata'] = function (key: string, value: any) {
    return function (target: Object | Function,
      propertyKey?: string | symbol,
      descriptor?: PropertyDescriptor | number): void {
      if (typeof descriptor === 'number') {
        Reflection.addMetadata(key, value, target, propertyKey);
      }
      else {
        Reflection.addMetadata(key, value, target, propertyKey, descriptor);
      }
    }
  };
}
else {
  // ===========================================
  // ES2017 - no need any hack
  // ===========================================
}

/**
 * Define an agent
 * @returns {(target:Constructor)=>(void|Constructor)}
 */
export function agent(identifierOrOptions?: any) {
  if (IsString(identifierOrOptions)) {
    return decorateAgent({ attribute: new AgentAttribute(identifierOrOptions) });
  }
  else {
    return decorateAgent(identifierOrOptions)
  }
}

/**
 * AgentAttribute
 */
export class AgentAttribute implements IAttribute {

  constructor(private _identifier?: any) {
  }

  get identifier(): any {
    return this._identifier;
  }

}

