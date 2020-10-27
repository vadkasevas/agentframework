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
exports.memorize = exports.Wisdom = exports.AgentFramework = exports.Parameter = exports.Property = exports.Member = void 0;
const Prototype_1 = require("./Helpers/Prototype");
/**
 * metadata for a member. key: string, value: any
 */
class Member extends Map {
    constructor() {
        super(...arguments);
        // metadata
        this.attributes = [];
    }
}
exports.Member = Member;
/**
 * Metadata for a property.
 */
class Property extends Member {
    constructor(target, key, descriptor) {
        super();
        this.target = target;
        this.key = key;
        descriptor && (this.descriptor = descriptor);
    }
    static find(property, target, key, descriptor) {
        const propertyDescriptor = Reflect.getOwnPropertyDescriptor(property, key);
        let value;
        if (propertyDescriptor) {
            value = propertyDescriptor.value;
            // NOTE: just in case decorate parameter called at first and decorate property called at second
            // if (descriptor && !value.descriptor) {
            //   console.log('d', value);
            //   value.descriptor = descriptor;
            // }
        }
        else {
            property[key] = value = new Property(target, key, descriptor);
        }
        return value;
    }
}
exports.Property = Property;
class Parameter extends Member {
    constructor(index) {
        super();
        this.index = index;
    }
    static find(property, index) {
        const map = property.parameters || (property.parameters = new Map());
        let value = map.get(index);
        if (!value) {
            map.set(index, (value = new Parameter(index)));
        }
        return value;
    }
}
exports.Parameter = Parameter;
class AgentFramework extends Map {
    constructor() {
        super();
        // ===============================================================================
        // if one day the browser implemented Reflect.metadata. We will reflector all
        // code related to metadata data in order to have a better performance.
        // ===============================================================================
        const { metadata } = Reflect;
        //
        // target   | property
        // -----------------------------------------------
        // Function + undefined     = Constructor
        // Object   + PropertyKey   = Class member
        // Function + PropertyKey   = Class static member
        //
        Reflect.set(Reflect, 'metadata', (key, value) => {
            return (target, targetKey, descriptor) => {
                let property;
                if (typeof targetKey === 'undefined') {
                    target = Reflect.get(target, 'prototype');
                    property = 'constructor';
                }
                else {
                    property = targetKey;
                }
                Property.find(this.add(target), target, property, descriptor).set(key, value);
                /* istanbul ignore next */
                return metadata && Reflect.apply(metadata, Reflect, [key, value])(target, targetKey, descriptor);
            };
        });
    }
    /**
     * Get
     */
    get(type) {
        return super.get(type);
    }
    /**
     * find
     */
    add(type) {
        const found = this.get(type);
        if (found) {
            return found;
        }
        let created;
        if (type === Function.prototype) {
            this.set(type, (created = Object.create(null)));
            return created;
        }
        // check parent and build object prototype chain
        const prototype = Reflect.getPrototypeOf(type);
        this.set(type, (created = Object.create(prototype && this.add(prototype))));
        return created;
    }
}
exports.AgentFramework = AgentFramework;
// AgentFramework Wisdom
exports.Wisdom = Function('_', 'return this[__=Symbol.for(_.name)]=this[__]||(this[__]=new _())')(AgentFramework);
// create singleton metadata for satellites project
// the memorize can be used on both class getter or static getter
function memorize(agent, key, type) {
    // const id1 = Reflect.getOwnPropertyDescriptor(agent, key);
    const id = Symbol.for(agent.name + '.' + key);
    let value = exports.Wisdom.get(id);
    /* istanbul ignore else */
    if (!value) {
        exports.Wisdom.set(id, (value = new (type || WeakMap)()));
    }
    // console.log('know', agent, key, '====', value);
    return Prototype_1.set(agent, key, value);
}
exports.memorize = memorize;
