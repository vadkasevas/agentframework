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
exports.OnDemandPropertyInfo = void 0;
const OnDemandMemberInfo_1 = require("./OnDemandMemberInfo");
const OnDemandParameterInfo_1 = require("./OnDemandParameterInfo");
const MemberKinds_1 = require("../Interfaces/MemberKinds");
// import { OnDemandPropertyValueInfo } from './OnDemandPropertyValueInfo';
// import { OnDemandPropertyGetterInfo } from './OnDemandPropertyGetterInfo';
// import { OnDemandPropertySetterInfo } from './OnDemandPropertySetterInfo';
const Filters_1 = require("../Helpers/Filters");
const AddAttribute_1 = require("../Annotation/AddAttribute");
/**
 * Property
 *
 * kind = MemberKinds.Property + (Method | Field | Getter | Setter)
 *
 */
class OnDemandPropertyInfo extends OnDemandMemberInfo_1.OnDemandMemberInfo {
    /**
     * Returns descriptor of this property. undefined if this is a field
     */
    get descriptor() {
        let descriptor;
        const annotation = this.annotation;
        if (annotation) {
            if (Reflect.has(annotation, 'descriptor')) {
                descriptor = annotation.descriptor;
            }
            else {
                descriptor = Reflect.getOwnPropertyDescriptor(this.declaringType.prototype, this.key); // descriptor is undefined for virtual property
                annotation.descriptor = descriptor;
            }
        }
        return descriptor;
        // return cache(this, 'descriptor', descriptor);
    }
    get kind() {
        let kind = MemberKinds_1.MemberKinds.Property;
        // const descriptor = this.descriptor;
        // if (descriptor) {
        //   if (Reflect.has(descriptor, 'value')) {
        //     kind |= MemberKinds.Method;
        //   } else {
        //     if (Reflect.has(descriptor, 'get')) {
        //       kind |= MemberKinds.Getter;
        //     }
        //     if (Reflect.has(descriptor, 'set')) {
        //       kind |= MemberKinds.Setter;
        //     }
        //   }
        // } else {
        //   kind |= MemberKinds.Field;
        // }
        return kind;
    }
    get type() {
        //return super.getOwnMetadata('design:returntype') || super.getOwnMetadata('design:type');
        if (this.descriptor) {
            return this.getOwnMetadata('design:returntype');
        }
        return this.getOwnMetadata('design:type');
    }
    get annotation() {
        return this.propertyAnnotationOrUndefined;
        // return cache(this, 'annotation', this.propertyAnnotation);
    }
    // protected get annotated(): boolean {
    //   const result = !!this.propertyAnnotationOrUndefined;
    //   if (result) {
    //     return true;
    //     // return cache(this, 'annotated', true);
    //   }
    //   return false;
    // }
    // get value(): OnDemandPropertyValueInfo {
    //   return getter(this, 'value', new OnDemandPropertyValueInfo(this.declaringType, this.key));
    // }
    //
    // get setter(): OnDemandPropertySetterInfo {
    //   return getter(this, 'setter', new OnDemandPropertySetterInfo(this.declaringType, this.key));
    // }
    //
    // get getter(): OnDemandPropertyGetterInfo {
    //   return getter(this, 'getter', new OnDemandPropertyGetterInfo(this.declaringType, this.key));
    // }
    // /**
    //  * Returns true if any attribute decorated
    //  */
    // hasAttribute<A1 extends Attribute>(type?: AbstractConstructor<A1>): boolean {
    //   // check own
    //   // check value
    //   // check getter
    //   // check setter
    //   throw new Error();
    // }
    //
    // /**
    //  * Returns a decorated attribute
    //  */
    // getAttribute<A2 extends Attribute>(type: AbstractConstructor<A2>): A2 | undefined {
    //   // check own
    //   // check value
    //   // check getter
    //   // check setter
    //   throw new Error();
    // }
    //
    // /**
    //  * Returns all decorated attributes
    //  */
    // getAttributes<A3 extends Attribute>(type?: AbstractConstructor<A3>): Array<A3> {
    //   // check own
    //   // check value
    //   // check getter
    //   // check setter
    //   throw new Error();
    // }
    // /**
    //  * Find attribute using filter function and filter criteria
    //  */
    // findAttributes<A5 extends Attribute>(filter: Filter<Attribute>, filterCriteria?: any): Array<A5> {
    //   throw new Error();
    // }
    /**
     * Return true if annotated any interceptor
     */
    hasInterceptor() {
        const annotation = this.annotation;
        if (!annotation) {
            return false;
        }
        // check property
        if (annotation.attributes && annotation.attributes.length && annotation.attributes.some(Filters_1.HasInterceptor)) {
            return true;
        }
        // check parameter
        if (annotation.parameters && annotation.parameters.size) {
            for (const parameterAnnotation of annotation.parameters.values()) {
                const attributes = parameterAnnotation.attributes;
                for (const attribute of attributes) {
                    if (Filters_1.HasInterceptor(attribute)) {
                        return true;
                    }
                }
            }
        }
        // check method, getter, setter
        // if (annotation.value && this.value.hasOwnInterceptor()) {
        //   return true;
        // }
        // if (annotation.getter && this.getter.hasOwnInterceptor()) {
        //   return true;
        // }
        // if (annotation.setter && this.setter.hasOwnInterceptor()) {
        //   return true;
        // }
        return false;
    }
    /**
     * Returns a parameter on index
     */
    parameter(index) {
        if (!this.parameters) {
            this.parameters = new Map();
        }
        let parameter = this.parameters.get(index);
        if (!parameter) {
            // passing `this` because parameter type metadata been added on property by TypeScript
            // always looking if we can remove this reference from parameter
            parameter = new OnDemandParameterInfo_1.OnDemandParameterInfo(this.target, this.key, index, this);
            this.parameters.set(index, parameter);
        }
        return parameter;
    }
    /**
     * Returns a parameter on index; undefined if not found
     */
    getParameter(index) {
        const annotation = this.annotation;
        if (annotation && annotation.parameters && annotation.parameters.has(index)) {
            return this.parameter(index);
        }
        return;
    }
    /**
     * Returns type of the parameters
     */
    getParameterTypes() {
        return this.getOwnMetadata('design:paramtypes');
    }
    /**
     * Returns annotated parameters
     */
    getParameters() {
        const params = new Array();
        const annotation = this.annotation;
        if (annotation && annotation.parameters && annotation.parameters.size) {
            const indices = [];
            for (const index of annotation.parameters.keys()) {
                indices.push(index);
            }
            for (const index of indices.sort()) {
                params.push(this.parameter(index));
            }
        }
        return params;
    }
    addAttribute(attribute) {
        AddAttribute_1.AddAttributeToMember(attribute, this.target, this.key);
    }
}
exports.OnDemandPropertyInfo = OnDemandPropertyInfo;
