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
exports.OnDemandParameterInfo = void 0;
const OnDemandMemberInfo_1 = require("./OnDemandMemberInfo");
const MemberKinds_1 = require("../Interfaces/MemberKinds");
const AddAttribute_1 = require("../Annotation/AddAttribute");
/**
 * Parameter
 */
class OnDemandParameterInfo extends OnDemandMemberInfo_1.OnDemandMemberInfo {
    constructor(target, propertyKey, index, parent) {
        super(target, propertyKey);
        this.index = index;
        this.parent = parent;
    }
    get name() {
        return this.index.toString();
    }
    get kind() {
        let kind = MemberKinds_1.MemberKinds.Parameter;
        // if (this.key === 'constructor') {
        //   kind |= MemberKinds.ConstructorParameter;
        // } else {
        //   kind |= MemberKinds.MethodParameter;
        // }
        return kind;
    }
    get type() {
        // get metadata from parent property, typescript store this meta in property level
        const params = this.parent.getParameterTypes();
        if (Array.isArray(params) && params.length) {
            return params[this.index];
        }
        return;
    }
    addAttribute(attribute) {
        // if the attribute provide a getInterceptor, that means this property may need inject
        // we don't call getInterceptor or getInitializer until user new() the agent class.
        AddAttribute_1.AddAttributeToMethodParameter(attribute, this.target, this.key, this.index);
    }
    // /**
    //  * Return true if this property is been annotated
    //  */
    // protected get annotated(): boolean {
    //   const annotation = this.propertyAnnotationOrUndefined;
    //   return !!(
    //     annotation &&
    //     annotation.parameters &&
    //     annotation.parameters.size &&
    //     annotation.parameters.has(this.index)
    //   );
    // }
    get annotation() {
        const property = this.propertyAnnotationOrUndefined;
        return property && property.parameters && property.parameters.get(this.index);
        // return getter(this, 'annotation', parameter);
    }
}
exports.OnDemandParameterInfo = OnDemandParameterInfo;
