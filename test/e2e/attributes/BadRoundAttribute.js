"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRoundAttribute = void 0;
class BadRoundAttribute {
    beforeDecorate(target, targetKey, descriptor) {
        return true;
    }
    get interceptor() {
        return 1;
    }
}
exports.BadRoundAttribute = BadRoundAttribute;
