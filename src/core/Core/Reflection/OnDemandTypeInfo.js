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
exports.OnDemandTypeInfo = void 0;
const OnDemandPropertyInfo_1 = require("./OnDemandPropertyInfo");
const MemberKinds_1 = require("../Interfaces/MemberKinds");
const Wisdom_1 = require("../Wisdom");
const AddAttribute_1 = require("../Annotation/AddAttribute");
const Knowledge_1 = require("../Knowledge");
// class TypeIteratorResult {
//   constructor(readonly done: boolean, readonly value: any) {}
// }
//
// class TypeIterableIterator {
//   // prototype
//   private current?: TypeInfo;
//
//   constructor(type: TypeInfo) {
//     this.current = type;
//   }
//
//   [Symbol.iterator](): IterableIterator<TypeInfo> {
//     return this;
//   }
//
//   next(): IteratorResult<TypeInfo> {
//     const current = this.current;
//     if (current) {
//       // move to next item for next time
//       this.current = current.base;
//       return new TypeIteratorResult(false, current);
//     }
//     return new TypeIteratorResult(true, undefined);
//   }
// }
/**
 * Reflection information for user class
 *
 * Basically a class is a Function. So Type extends from Method
 **/
class OnDemandTypeInfo extends OnDemandPropertyInfo_1.OnDemandPropertyInfo {
    /**
     * get types map
     */
    static get types() {
        return Wisdom_1.memorize(this, 'types');
    }
    /**
     * Get TypeInfo from constructor
     */
    static find(target) {
        // make sure only create typeinfo for user classes
        const type = Knowledge_1.GetType(target) || target;
        // return new OnDemandTypeInfo(type);
        let t = this.types.get(type);
        if (!t) {
            t = new OnDemandTypeInfo(type);
            this.types.set(type, t);
        }
        return t;
    }
    /**
     * properties cache
     */
    // protected properties: Map<PropertyKey, OnDemandPropertyInfo> | undefined;
    // only allow create using factory method
    // make type as a property called constructor
    constructor(target) {
        super(target, 'constructor');
    }
    get static() {
        return OnDemandTypeInfo.find(this.declaringType);
    }
    get prototype() {
        return OnDemandTypeInfo.find(this.declaringType.prototype);
    }
    get type() {
        return this.declaringType;
    }
    get name() {
        return this.type.name;
    }
    get kind() {
        return MemberKinds_1.MemberKinds.Class;
    }
    get descriptor() {
        return Reflect.getOwnPropertyDescriptor(this.declaringType.prototype, this.key);
    }
    /**
     * Returns base type
     *
     * @cache
     */
    get base() {
        const base = Reflect.getPrototypeOf(this.target);
        // ignore object as base type
        if (!base || base.constructor === Object || Knowledge_1.IsAgent(base)) {
            // stop if agent, because previous agent already
            return;
            // return cache(this, 'base', undefined);
        }
        return OnDemandTypeInfo.find(base);
        // return cache(this, 'base', TypeInfo.get(base.constructor));
    }
    /**
     * Returns prototypes for this type
     *
     * @cache
     */
    get types() {
        // this can cache because it never changes
        const prototypes = [];
        /* eslint-disable-next-line @typescript-eslint/no-this-alias */
        let current = this;
        do {
            prototypes.push(current);
            current = current.base;
        } while (current);
        return prototypes;
        // return cache(this, 'prototypes', prototypes);
    }
    // /**
    //  * Add the metadata
    //  */
    // addMetadata(key: string, value: any) {
    //   // for class
    //   super.addMetadata(key, value);
    //   // apply class method parameter type into parameter metadata
    //   if (key === 'design:paramtypes' && value && value.length) {
    //     const types = value as Array<any>;
    //     for (let idx = types.length - 1; idx >= 0; idx--) {
    //       try {
    //         this.parameter(idx).addMetadata('design:type', types[idx]);
    //       } catch {
    //         // console.log('ctor', idx, types[idx], this.prototype.constructor);
    //       }
    //     }
    //   }
    // }
    /**
     * Get or create a property for current type
     */
    property(key) {
        // if (!this.properties) {
        //   this.properties = new Map<PropertyKey, OnDemandPropertyInfo>();
        // }
        // let propertyInfo = this.properties.get(key);
        // if (!propertyInfo) {
        //   propertyInfo = new OnDemandPropertyInfo(this.declaringType, key);
        //   this.properties.set(key, propertyInfo);
        // }
        // return propertyInfo;
        return new OnDemandPropertyInfo_1.OnDemandPropertyInfo(this.target, key);
    }
    /**
     * Return true if any properties annotated on this type
     */
    hasOwnProperties() {
        const annotations = this.typeAnnotationOrUndefined;
        if (!annotations) {
            return false;
        }
        for (const key of Reflect.ownKeys(annotations)) {
            if (key === 'constructor') {
                continue;
            }
            return true;
        }
        return false;
    }
    /**
     * Return all own properties
     */
    getOwnProperties() {
        const properties = new Array();
        const annotations = this.typeAnnotationOrUndefined;
        if (!annotations) {
            return properties;
        }
        for (const key of Reflect.ownKeys(annotations)) {
            if (key === 'constructor') {
                continue;
            }
            properties.push(this.property(key));
        }
        return properties;
    }
    /**
     * Get own property, return undefined if not exists
     */
    getOwnProperty(key) {
        const annotations = this.typeAnnotationOrUndefined;
        if (!annotations) {
            return;
        }
        const descriptor = Reflect.getOwnPropertyDescriptor(annotations, key);
        // const descriptor = Reflect.getOwnPropertyDescriptor(this.typeAnnotation, key);
        if (descriptor) {
            return this.property(key);
        }
        return;
    }
    /**
     * Get annotated property in prototypes, return undefined if not found
     */
    getProperty(key) {
        // const annotation = this.typeAnnotationOrUndefined;
        // if (!annotation) {
        //   return;
        // }
        // const meta: PropertyAnnotation | undefined = Reflect.get(annotation, key);
        const propertyAnnotation = Reflect.get(this.typeAnnotation, key);
        if (propertyAnnotation) {
            if (propertyAnnotation.target === this.target) {
                return this.getOwnProperty(key);
            }
            else {
                return OnDemandTypeInfo.find(propertyAnnotation.target).getOwnProperty(key);
            }
        }
        return;
    }
    /**
     * Returns a filtered array of Property objects of this prototype.
     *
     * @param {Filter<PropertyInfo>} filter
     * @param filterCriteria
     * @returns {Map<PropertyKey, OnDemandPropertyInfo>}
     */
    findOwnProperties(filter, filterCriteria) {
        const properties = new Array();
        for (const property of this.getOwnProperties()) {
            if (filter(property, filterCriteria)) {
                properties.push(property);
            }
        }
        return properties;
    }
    /**
     * Returns a filtered array of Property objects for all prototype in prototype chain - deep first [base of base, base, this]
     *
     * @param {Filter<PropertyInfo>} filter
     * @param filterCriteria
     * @returns {Map<TypeInfo, Array<PropertyInfo>>}
     */
    findProperties(filter, filterCriteria) {
        const layers = new Map();
        for (const type of this.types) {
            const found = type.findOwnProperties(filter, filterCriteria);
            if (found.length) {
                layers.set(type, found);
            }
        }
        return layers;
    }
    /**
     * Find types from prototype chain
     */
    findTypes(filter, filterCriteria) {
        if (!filter) {
            return this.types.slice(0);
        }
        const types = new Array();
        for (const type of this.types) {
            const found = filter(type, filterCriteria);
            if (found) {
                types.push(type);
            }
        }
        return types;
    }
    addAttribute(attribute) {
        AddAttribute_1.AddAttributeToClass(attribute, this.target);
    }
    /**
     * Get annotation store object
     */
    get typeAnnotation() {
        // console.log('an', a++);
        return Wisdom_1.Wisdom.add(this.target);
        // return cache(this, 'typeAnnotation', Annotator.get(this.declaringType));
    }
    /**
     * Get annotation store object or undefined
     */
    get typeAnnotationOrUndefined() {
        return Wisdom_1.Wisdom.get(this.target);
        // return cache(this, 'typeAnnotationOrUndefined', annotation);
    }
    getOwnMetadata(key) {
        const annotation = this.annotation;
        if (annotation && annotation.has(key)) {
            return annotation.get(key);
        }
        /* istanbul ignore next */
        if (Reflect['getOwnMetadata']) {
            return Reflect['getOwnMetadata'](key, this.declaringType);
        }
        return;
    }
}
exports.OnDemandTypeInfo = OnDemandTypeInfo;
