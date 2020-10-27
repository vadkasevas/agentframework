"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializableAttribute = void 0;
const Symbols_1 = require("../Symbols");
const FindDomainFromInvocation_1 = require("../Helpers/FindDomainFromInvocation");
const FindInitializers_1 = require("../Helpers/FindInitializers");
class InitializableAttribute {
    get interceptor() {
        return this;
    }
    intercept(target, params, receiver) {
        let instance;
        const type = target.design.declaringType;
        // const init = (target: ClassInvocation, params: Arguments, receiver: any)
        // console.log('proxy target', typeof type, type, target.design.type);
        // console.log('proxy agent', receiver);
        // console.log('proxy ctor', params);
        // create instance
        const initializerFunction = type[Symbols_1.ClassInitializer];
        // in case of human mistake, check prototype if no static initializer function found
        if (initializerFunction) {
            if (typeof initializerFunction === 'function') {
                const domain = FindDomainFromInvocation_1.FindDomainFromInvocation(params, receiver);
                // debugger;
                // console.log('call initializerFunction', target);
                // found class initializer function
                // create instance using initializer function
                instance = Reflect.apply(initializerFunction, type, [domain, target, params, receiver]);
                // if (!(newCreated instanceof DomainAgentClass)) {
                //   console.log('invalid new domain agent');
                //   console.log('new Required', DomainAgentClass);
                //   console.log('new Created', newCreated);
                // }
            }
            else {
                throw new SyntaxError('ClassInitializerMustFunction');
            }
        }
        else {
            // TODO: move this code to static check during compilation to avoid human mistakes
            // if (target.prototype[ClassInitializer]) {
            //   throw new SyntaxError('ClassInitializerMustStatic');
            // }
            // console.log('call target.invoke');
            instance = target.invoke(params, receiver);
        }
        // after create instance
        const initializers = FindInitializers_1.FindInitializers(type);
        if (initializers.length) {
            for (const layer of initializers) {
                Reflect.apply(layer[0], instance, params);
            }
        }
        return instance;
    }
}
exports.InitializableAttribute = InitializableAttribute;
