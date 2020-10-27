"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentTrackerAttribute = void 0;
const OnDemandTypeInfo_1 = require("../../../src/core/Core/Reflection/OnDemandTypeInfo");
class AgentTrackerAttribute {
    get interceptor() {
        return this;
    }
    intercept(target, parameters, receiver) {
        if (!(target.design instanceof OnDemandTypeInfo_1.OnDemandTypeInfo)) {
            throw new Error('design is not a Type');
        }
        return target.invoke(parameters, receiver);
    }
}
exports.AgentTrackerAttribute = AgentTrackerAttribute;
