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
exports.OnDemandClassCompiler = void 0;
// utilize code gen
const ChainFactory_1 = require("./Factory/ChainFactory");
const FieldGetterInvocation_1 = require("./Invocation/FieldGetterInvocation");
const FieldSetterInvocation_1 = require("./Invocation/FieldSetterInvocation");
const DirectMethodInvocation_1 = require("./Invocation/DirectMethodInvocation");
const InterceptorInvocation_1 = require("./Invocation/InterceptorInvocation");
const ParameterInterceptor_1 = require("./Invocation/ParameterInterceptor");
const Filters_1 = require("../Helpers/Filters");
const Prototype_1 = require("../Helpers/Prototype");
class OnDemandClassCompiler {
    /**
     * Create interceptor for field initializer
     */
    static findPropertyInterceptors(property) {
        const attributes = property.findOwnAttributes(Filters_1.HasInterceptor);
        //.concat(property.value.findOwnAttributes(HasInterceptor));
        return attributes;
    }
    // /**
    //  * Create interceptor for the getter
    //  */
    // private static createGetterInterceptor(origin: PropertyInvocation): Invocation {
    //   // console.log('createGetterInterceptor', origin.target.name, origin.design.name);
    //   const property = origin.design;
    //   const attributes = property.findOwnAttributes(HasInterceptor);
    //   //.concat(property.getter.findOwnAttributes(HasInterceptor));
    //   return ChainFactory.chainInterceptorAttributes(origin, attributes);
    // }
    //
    // /**
    //  * Create interceptor for the setter
    //  */
    // private static createSetterInterceptor(origin: PropertyInvocation): Invocation {
    //   // console.log('createSetterInterceptor', origin.target.name, origin.design.name);
    //   const property = origin.design;
    //   const attributes = property.findOwnAttributes(HasInterceptor);
    //   //.concat(property.setter.findOwnAttributes(HasInterceptor));
    //   return ChainFactory.chainInterceptorAttributes(origin, attributes);
    // }
    // /**
    //  * Create method interceptor
    //  */
    // static createMethodInterceptor(origin: PropertyInvocation): Invocation {
    //   // console.log('createMethodInterceptor', origin.target.name, origin.design.name);
    //   const property = origin.design;
    //
    //   //
    //   const attributes = property.findOwnAttributes(HasInterceptor);
    //   //.concat(property.value.findOwnAttributes(HasInterceptor));
    //
    //   // create interceptor
    //   const intercepted = ChainFactory.chainInterceptorAttributes(origin, attributes);
    //
    //   // create a extra parameter invocation if have
    //   return new InterceptorInvocation(intercepted, new ParameterInterceptor(property));
    // }
    /**
     * Create constructor interceptor
     */
    static createConstructorInterceptor(origin) {
        // console.log('createMethodInterceptor', origin.target.name, origin.design.name);
        const type = origin.design;
        // find all attribute from prototype
        // const interceptors = property.findOwnAttributes(HasInterceptor);
        const interceptorArrays = type.findTypes().map((type) => type.findOwnAttributes(Filters_1.HasInterceptor));
        const emptyArray = [];
        const interceptors = emptyArray.concat(...interceptorArrays);
        // create interceptor
        const intercepted = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, interceptors);
        // create parameter invocation if have
        return new InterceptorInvocation_1.InterceptorInvocation(intercepted, new ParameterInterceptor_1.ParameterInterceptor(type));
    }
    // static createParameterInterceptor(origin: IParameterInvocation, interceptors): IInvocation {
    //   const design = origin.design;
    //
    //   const interceptors = design.getInterceptors(); // get all interceptors
    //
    //   // create interceptor
    //   return ChainFactory.chainInterceptorAttributes(origin, interceptors);
    // }
    /**
     * Field will only call interceptor for only 1 time
     */
    static makeField(field, receiver) {
        const key = field.key;
        return {
            get() {
                const origin = new FieldGetterInvocation_1.FieldGetterInvocation(field);
                const attributes = OnDemandClassCompiler.findPropertyInterceptors(field);
                const chain = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes);
                const descriptor = {
                    get() {
                        return chain.invoke([undefined], this);
                        // return set(this, key, chain.invoke([undefined], this));
                    },
                    set() {
                        const origin = new FieldSetterInvocation_1.FieldSetterInvocation(field);
                        const attributes = OnDemandClassCompiler.findPropertyInterceptors(field);
                        const chain = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes);
                        descriptor.set = function () {
                            chain.invoke(arguments, this);
                        };
                        Prototype_1.define(receiver.prototype, key, descriptor);
                        chain.invoke(arguments, this);
                    },
                    configurable: true,
                };
                Prototype_1.define(receiver.prototype, key, descriptor);
                return chain.invoke([undefined], this);
                // return set(this, key, chain.invoke([undefined], this));
            },
            set(value) {
                const origin = new FieldSetterInvocation_1.FieldSetterInvocation(field);
                const attributes = OnDemandClassCompiler.findPropertyInterceptors(field);
                const chain = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes);
                const descriptor = {
                    get() {
                        const origin = new FieldGetterInvocation_1.FieldGetterInvocation(field);
                        const attributes = OnDemandClassCompiler.findPropertyInterceptors(field);
                        const chain = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes);
                        descriptor.get = function () {
                            return chain.invoke([undefined], this);
                            // return set(this, key, chain.invoke([undefined], this));
                        };
                        Prototype_1.define(receiver.prototype, key, descriptor);
                        return chain.invoke([undefined], this);
                        // return set(this, key, chain.invoke([undefined], this));
                    },
                    set() {
                        return chain.invoke(arguments, this);
                    },
                    configurable: true,
                };
                Prototype_1.define(receiver.prototype, key, descriptor);
                return chain.invoke(arguments, this);
            },
            configurable: true,
        };
    }
    static makeProperty(property, descriptor, receiver) {
        const key = property.key;
        const propertyDescriptor = Object.create(descriptor);
        // user can change this property
        propertyDescriptor.configurable = true;
        const method = descriptor.value;
        const getterMethod = descriptor.get;
        const setterMethod = descriptor.set;
        if (method != null) {
            // value only
            propertyDescriptor.value = function () {
                const origin = new DirectMethodInvocation_1.DirectMethodInvocation(property, method);
                const attributes = OnDemandClassCompiler.findPropertyInterceptors(property);
                const chain = new InterceptorInvocation_1.InterceptorInvocation(ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes), new ParameterInterceptor_1.ParameterInterceptor(property));
                propertyDescriptor.value = function () {
                    return chain.invoke(arguments, this);
                };
                Prototype_1.define(receiver.prototype, key, propertyDescriptor);
                return chain.invoke(arguments, this);
            };
        }
        else {
            // getter and setter
            if (getterMethod != null) {
                if (setterMethod != null) {
                    // getter and setter
                    propertyDescriptor.get = function () {
                        const origin = new DirectMethodInvocation_1.DirectMethodInvocation(property, getterMethod);
                        const attributes = OnDemandClassCompiler.findPropertyInterceptors(property);
                        const chain = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes);
                        const descriptor = {
                            get() {
                                return chain.invoke([undefined], this);
                            },
                            set(value) {
                                const origin = new DirectMethodInvocation_1.DirectMethodInvocation(property, setterMethod);
                                const attributes = OnDemandClassCompiler.findPropertyInterceptors(property);
                                const chain = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes);
                                descriptor.set = function () {
                                    chain.invoke(arguments, this);
                                };
                                Prototype_1.define(receiver.prototype, key, descriptor);
                                chain.invoke(arguments, this);
                            },
                            configurable: true,
                        };
                        Prototype_1.define(receiver.prototype, key, descriptor);
                        return chain.invoke([undefined], this);
                    };
                    propertyDescriptor.set = function () {
                        const origin = new DirectMethodInvocation_1.DirectMethodInvocation(property, setterMethod);
                        const attributes = OnDemandClassCompiler.findPropertyInterceptors(property);
                        const chain = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes);
                        const descriptor = {
                            get() {
                                const origin = new DirectMethodInvocation_1.DirectMethodInvocation(property, getterMethod);
                                const attributes = OnDemandClassCompiler.findPropertyInterceptors(property);
                                const chain = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes);
                                descriptor.get = function () {
                                    return chain.invoke([undefined], this);
                                };
                                Prototype_1.define(receiver.prototype, key, descriptor);
                                return chain.invoke([undefined], this);
                            },
                            set() {
                                return chain.invoke(arguments, this);
                            },
                            configurable: true,
                        };
                        Prototype_1.define(receiver.prototype, key, descriptor);
                        return chain.invoke(arguments, this);
                    };
                }
                else {
                    // getter
                    propertyDescriptor.get = function () {
                        const origin = new DirectMethodInvocation_1.DirectMethodInvocation(property, getterMethod);
                        const attributes = OnDemandClassCompiler.findPropertyInterceptors(property);
                        const chain = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes);
                        propertyDescriptor.get = function () {
                            return chain.invoke([undefined], this);
                        };
                        Prototype_1.define(receiver.prototype, key, propertyDescriptor);
                        return chain.invoke([undefined], this);
                    };
                }
            } /* istanbul ignore else */
            else if (setterMethod != null) {
                // setter
                propertyDescriptor.set = function () {
                    const origin = new DirectMethodInvocation_1.DirectMethodInvocation(property, setterMethod);
                    const attributes = OnDemandClassCompiler.findPropertyInterceptors(property);
                    const chain = ChainFactory_1.ChainFactory.chainInterceptorAttributes(origin, attributes);
                    propertyDescriptor.set = function () {
                        return chain.invoke(arguments, this);
                    };
                    Prototype_1.define(receiver.prototype, key, propertyDescriptor);
                    return chain.invoke(arguments, this);
                };
            }
            else {
                throw new Error('Invalid empty property' + property.declaringType.name + '.' + key.toString());
            }
        }
        // console.log('descriptor', descriptor);
        // console.log('propertyDescriptor', propertyDescriptor);
        return propertyDescriptor;
    }
    static upgrade(proxy, properties, target, receiver) {
        const map = {};
        // only proxy property contains interceptor
        // property without interceptor is metadata only attribute
        for (const property of properties) {
            const descriptor = property.descriptor;
            if (descriptor) {
                map[property.key] = OnDemandClassCompiler.makeProperty(property, descriptor, receiver || target);
            }
            else {
                map[property.key] = OnDemandClassCompiler.makeField(property, receiver || target);
            }
        }
        // use define properties is a little bit faster then define the property one by one
        Object.defineProperties(proxy, map);
        return map;
    }
}
exports.OnDemandClassCompiler = OnDemandClassCompiler;
