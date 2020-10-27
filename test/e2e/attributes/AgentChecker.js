"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentChecker = void 0;
const OnDemandTypeInfo_1 = require("../../../src/core/Core/Reflection/OnDemandTypeInfo");
class AgentChecker {
    get interceptor() {
        return this;
    }
    beforeDecorate(target, targetKey, descriptor) {
        return true;
    }
    intercept(target, parameters, receiver) {
        expect(target.design instanceof OnDemandTypeInfo_1.OnDemandTypeInfo).toBeTruthy();
        return target.invoke(Array.prototype.slice.call(parameters, 0), receiver);
    }
}
exports.AgentChecker = AgentChecker;
