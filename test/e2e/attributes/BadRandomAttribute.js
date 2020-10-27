"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRandomAttribute = void 0;
class BadRandomAttribute {
    beforeDecorate(target, targetKey, descriptor) {
        return true;
    }
    get inteceptor() {
        return 2;
    }
}
exports.BadRandomAttribute = BadRandomAttribute;
