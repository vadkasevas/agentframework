import { Reflector } from './Reflection/Reflector';
import { decorateAgent } from './Decorator/decorateAgent';
import { AgentAttribute } from './Compiler/AgentAttribute';
import { IAttribute } from './Core/IAttribute';
import { Resolve } from './Internal/Resolve';
import { Constructor } from './Core/Constructor';
import { CanDecorate } from './Compiler/Internal/Utils';
import { CreateAgentInvocation } from './Compiler/CreateAgentInvocation';

// ===========================================
// ES5 or before
// ===========================================
/* istanbul ignore if  */
if (typeof Reflect !== 'object') {
  throw new Error('AgentFramework requires ES6 (ES2015) support');
}

const metadataFn = Reflect['metadata'];

// ===========================================
// ES6 and after
// ===========================================
if (typeof metadataFn !== 'function') {
  // Install Reflect.metadata for tsc only
  // tsc will add following code to the generated js file. in order to utilize these information.
  // we create Reflect.metadata to capture these information and save to Reflection objects
  //     Reflect.metadata("design:type", Function),
  //     Reflect.metadata("design:paramtypes", []),
  //     Reflect.metadata("design:returntype", String)
  Reflect['metadata'] = function(key: string, value: any) {
    return function(target: Function | Object, property?: string | symbol, descriptor?: PropertyDescriptor): void {
      if (property) {
        Reflector(target)
          .property(property, descriptor)
          .addMetadata(key, value);
      } else {
        Reflector(target).addMetadata(key, value);
      }
    };
  };
  // tag this function to prevent inject itself
  Reflect['metadata']['$AgentFramework'] = true;
} else if (!metadataFn['$AgentFramework']) {
  // ========================================================================================
  // ES.future - intercept Reflect.metadata because tsc generate 3 parameters
  // ========================================================================================
  Reflect['metadata'] = function(key: string, value: any) {
    const metadataDecorator = metadataFn(key, value);
    return function(target: Function | Object, property?: string | symbol, descriptor?: PropertyDescriptor): void {
      if (property) {
        Reflector(target)
          .property(property, descriptor)
          .addMetadata(key, value);
        return metadataDecorator(target as object, property!);
      } else {
        Reflector(target).addMetadata(key, value);
        return metadataDecorator(target as Function);
      }
    };
  };
}

/**
 * Define an agent
 */
export function agent(attributes?: IAttribute[]) {
  return decorateAgent(Resolve(AgentAttribute), attributes);
}

/**
 * Upgrade a class with @decorators into agent (add support for Interceptor and Initializer)
 */
export function Agent<T>(target: Constructor<T>, options?: AgentAttribute): Constructor<T> {
  // the attributes to initialize agent constructor
  // current only support only one initializer, multiple interceptors
  if (!options) {
    options = Resolve(AgentAttribute);
  }
  if (CanDecorate(options, target)) {
    return CreateAgentInvocation(target, options);
  }
  return target;
}
