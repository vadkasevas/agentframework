"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeforeRoundAttribute = void 0;
const OnDemandPropertyInfo_1 = require("../../../src/core/Core/Reflection/OnDemandPropertyInfo");
class BeforeRoundAttribute {
    beforeDecorate(target, targetKey, descriptor) {
        return true;
    }
    intercept(target, parameters, receiver) {
        if (target.design) {
            // console.log('design', target.design)
            expect(target.design instanceof OnDemandPropertyInfo_1.OnDemandPropertyInfo).toBeTruthy();
        }
        else {
            expect(target.design).toBeUndefined();
        }
        let input = parameters[0];
        if ('number' !== typeof input) {
            input = 0;
        }
        input = Math.round(input);
        return target.invoke([input, parameters[1], parameters[2]], receiver);
    }
    get interceptor() {
        return this;
    }
}
exports.BeforeRoundAttribute = BeforeRoundAttribute;
